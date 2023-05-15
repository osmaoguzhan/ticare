import Constants from "@/utils/Constants";
import _ from "lodash";

export function getCustomers(session, params) {
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
