import Constants from "@/utils/Constants";
import _ from "lodash";

export function getSuppliers(session, params) {
  let query = {
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
    query = { ...query, where: { companyId } };
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
