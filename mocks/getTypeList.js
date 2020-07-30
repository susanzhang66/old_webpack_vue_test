

module.exports = {
  '/rest/mallTypeRest/getTypeList': {
    '$post': {
        "total": 0,
        "data": [
              {
                "id": 1,
                "status": 1,
                "isPublic": 2,     //2为私有的
                "photo": null,     //分类图片，目前没有用
                "centerId": 1,    //中心id
                "addTime": 1431266723458,
                "sortInfo": 1,
                "productTypeName": "苹果"   //分类名称
              },
              {
                "id": 2,
                "status": 1,
                "photo": null,
                "addTime": 1431266723458,
                "sortInfo": 2,
                "centerId": 1,
                "isPublic": 2,
                "productTypeName": "雪梨"
              },
              {
                "id": 3,
                "status": 1,
                "photo": null,
                "addTime": 1431266723458,
                "sortInfo": 3,
                "centerId": 1,
                "isPublic": 2,
                "productTypeName": "香蕉"
              },
              {
                "id": 4,
                "status": 1,
                "photo": null,
                "addTime": 1431266723458,
                "sortInfo": 4,
                "centerId": 1,
                "isPublic": 2,
                "productTypeName": "西瓜"
              }
        ],
        "code": "0001",
        "desc": "ok",
        "rows": []
    }
        
  }
}; 