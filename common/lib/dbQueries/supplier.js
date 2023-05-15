import Constants from "@/utils/Constants";
import _ from "lodash";

export function getSuppliers(session, params) {
  let query = {
    where: { isActive: true },
    include: {
      company: {
        select: {
          name: true,
        },
      },
    },
  };
  if (
    session?.user?.role === Constants.ROLES.USER ||
    !_.isNil(params?.companyId)
  ) {
    let companyId = params?.companyId || session?.user?.company.id;
    query.where.companyId = companyId;
  }
  return query;
}

export function getSupplier(id) {
  return {
    where: { id },
    include: {
      company: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  };
}

export function supplierRelationsQuery(ids) {
  return {
    pipeline: [
      {
        $match: {
          _id: {
            $in: ids.map((id) => {
              return { $oid: id };
            }),
          },
        },
      },
      {
        $lookup: {
          from: "Purchase",
          localField: "_id",
          foreignField: "supplierId",
          as: "Purchase",
        },
      },
      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          isDeletable: {
            $eq: [{ $size: "$Purchase" }, 0],
          },
        },
      },
    ],
  };
}
