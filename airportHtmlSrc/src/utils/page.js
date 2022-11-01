export default function page (query) {
    let _p = {
        current: 1,//当前页码
        pageSize: 10, //当前条数
        total: 0, //总共条数
        showTotal: total => `共 ${total} 条`,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50', '100'], //limit配置
        onShowSizeChange: (current, size) => { 
            let _current = current
            let _pagesize = size

            _p.current = current; 
            _p.pageSize = size; 
            query().then(res=>{
                if(res){
                    if(res.size!=undefined){
                        _p.pageSize = res.size
                    }
                    if(res.total!=undefined){
                        _p.total = total
                    }
                    if(res.current!=undefined){
                        _p.current = res.current
                    }
                }
            }).catch(err=>{
                _p.current = _current
                _p.pageSize = _pagesize
            }) 
        }, //limit改变时的回调
        onChange: (current, size) => {
            let _current = current
            let _pagesize = size

            _p.current = current; 
            _p.pageSize = size; 
            query().then(res=>{
                if(res){
                    if(res.size!=undefined){
                        _p.pageSize = res.size
                    }
                    if(res.total!=undefined){
                        _p.total = total
                    }
                    if(res.current!=undefined){
                        _p.current = res.current
                    }
                }
            }).catch(err=>{
                _p.current = _current
                _p.pageSize = _pagesize
            }) 
        } //page 改变时的回调
    }
    return _p
}