
//航路点类型： http://47.117.120.164/DataDict/GetList?DictType=AirPointType
// 航路点状态： http://47.117.120.164/DataDict/GetList?DictType=AirPointStatus
// 边框样式：http://47.117.120.164/DataDict/GetList?DictType=BorderStyle

// 航路点列表：http://47.117.120.164/AirPoint/GetList
// 航路点实例：http://47.117.120.164/AirPoint/GetById?id=1
// 航路点保存(0为新增，否则为修改)：http://47.117.120.164/AirPoint/Save   
// 航路点删除：http://47.117.120.164/AirPoint/Delete
import request from '@/utils/request'

const _url = {
    ParamsList:"/DataDict/GetList",
    AirPointQuery:"/AirPoint/GetList",
    AirPoint:"/AirPoint/GetById",
    AirPointSave:"/AirPoint/Save",
    AirPointDelete:"/AirPoint/Delete",
}

export function GetDict(tp){
    let url=_url.ParamsList+"?DictType="+tp
    return request({
        method:"get",
        url:url,
    })
}

export function AirPointQuery(query){
    return request({
        method:"get",
        url:_url.AirPointQuery,
        params:query,

    })
}


export function AirPointSave(data){
    return request({
        method:'post',
        url:_url.AirPointSave,
        data:data,
    })
}

export function AirPointDelete(ids){
    return request({
        method:'post',
        url:_url.AirPointDelete,
        data:{ids:ids}
    })
}