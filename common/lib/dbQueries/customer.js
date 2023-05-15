import Constants from "@/utils/Constants";
import _ from "lodash";

export function getCustomers(session, params) {
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

export function getCustomer(id) {
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

export function customerRelationsQuery(ids) {
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
          from: "Sale",
          localField: "_id",
          foreignField: "customerId",
          as: "Sale",
        },
      },
      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          isDeletable: {
            $eq: [{ $size: "$Sale" }, 0],
          },
        },
      },
    ],
  };
}
