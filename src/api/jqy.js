import request from '@/utils/request'
import API from '@/api/url'

export function personnelsUrl(method, id, data = {}) {
  const obj = {
    url: id ? API.PersonnelsUrl + id + '/' : API.PersonnelsUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function personnelsUrlDel(method, id, data = {}) {
  const obj = {
    url: id ? API.PersonnelsUrlDel + id + '/' : API.PersonnelsUrlDel,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function userImport(method, id, data = {}) {
  const obj = {
    url: id ? API.UserImport + id + '/' : API.UserImport,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function delUser(method, id, data = {}) {
  const obj = {
    url: id ? API.DelUser + id + '/' : API.DelUser,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function sectionTree(method, id, data = {}) {
  const obj = {
    url: id ? API.SectionTree + id + '/' : API.SectionTree,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function roles(method, id, data = {}) {
  const obj = {
    url: id ? API.GroupUrl + id + '/' : API.GroupUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function rolesUpdate(method, id, data = {}) {
  const obj = {
    url: id ? API.GroupUrlUpdate + id + '/' : API.GroupUrlUpdate,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function rolesDel(method, id, data = {}) {
  const obj = {
    url: id ? API.GroupUrlDel + id + '/' : API.GroupUrlDel,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function userOperationLog(method, id, data = {}) {
  const obj = {
    url: id ? API.UserOperationLog + id + '/' : API.UserOperationLog,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function material(method, id, data = {}) {
  const obj = {
    url: id ? API.Material + id + '/' : API.Material,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function materialDisplay(method, id, data = {}) {
  const obj = {
    url: id ? API.MaterialDisplay + id + '/' : API.MaterialDisplay,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function multiQuery(method, id, data = {}) {
  const obj = {
    url: id ? API.MultiQuery + id + '/' : API.MultiQuery,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function problem(method, id, data = {}) {
  const obj = {
    url: id ? API.Problem + id + '/' : API.Problem,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function problemImportExcel(method, id, data = {}) {
  const obj = {
    url: id ? API.ProblemImportExcel + id + '/' : API.ProblemImportExcel,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function resourceUpload(method, id, data = {}) {
  const obj = {
    url: id ? API.ResourceUpload + id + '/' : API.ResourceUpload,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function globalCodes(method, id, data = {}) {
  const obj = {
    url: id ? API.GlobalCodes + id + '/' : API.GlobalCodes,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function problemAnalysis(method, id, data = {}) {
  const obj = {
    url: id ? API.ProblemAnalysis + id + '/' : API.ProblemAnalysis,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
