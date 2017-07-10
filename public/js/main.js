
var content = new Vue({
    el: '.table',
    created: function () {
        this.getList();
    },
    data: {
        datas: '',
        pageNum: 1,
        totalNum: 1
    },
    methods: {
        getList( page_num = 1, page_size = 10 ) {
            if(page_num<1 || page_num>this.totalNum) return;
            let req = {
                page_num,
                page_size
            }
            this.$http.post('/api/getData', req).then(function (data) {
                if(!data) return;
                this.datas = data.body.datas;
                this.pageNum = data.body.page.page_num;
                this.totalNum = data.body.page.total_num;
            })
        }
    }
})
