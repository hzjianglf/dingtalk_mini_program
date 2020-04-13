let domain = "https://bc.xllzj.com/api";

Page({
  data: {
    open_id: '',
    user_name: '',
    user_mobile: '',
    list: [],
    page: 1,
    isLoading: false,
    no_more: false
  },

  onLoad(query) {
    var _this = this;
    let user = dd.getStorageSync({ key: 'user' });
    if (user.data.open_id) {
      _this.setData(user.data);
    } else {
      _this.loginSystem();
    }
    _this.setData({
      'order_type': query.order_type
    });

    _this.getOrderList(0, 1);
  },

  getOrderList(isPage, page) {
    var _this = this;
    let url = domain + '/order/lists';
    let open_id = _this.data.open_id;
    let order_type = _this.data.order_type;

    dd.httpRequest({
      url: url,
      method: 'GET',
      data: {
        page: page,
        is_today: 1,
        order_type: order_type,
        open_id: open_id
      },
      success: function (res) {
        let resList = res.data.data.list,
          dataList = _this.data.list;
        if (isPage == true) {
          _this.setData({
            'list.data': dataList.data.concat(resList.data),
            isLoading: false,
          });
        } else {
          _this.setData({
            list: resList,
            isLoading: false,
          });
        }

      }
    })
  },

  /**
    * 下拉刷新
    */
  onPullDownRefresh() {
    // 获取工单列表
    this.getOrderList(0, 1);

    // 停止刷新
    dd.stopPullDownRefresh();
  },

  /**
   *  页面被拉到底部
   */
  onReachBottom() {
    // 已经是最后一页
    if (this.data.page >= this.data.list.last_page) {
      this.setData({
        no_more: true
      });
      return false;
    }
    // 加载下一页列表
    this.getOrderList(true, ++this.data.page);
  },

  loginSystem() {
    let url = domain + '/user/login';
    let user = dd.getStorageSync({ key: 'user' });
    if (user.data.open_id) {
      this.setData(user.data);
    } else {
      dd.getAuthCode({
        success: (res) => {
          this.setData({
            authCode: res.authCode
          });

          dd.httpRequest({
            url: url,
            method: 'POST',
            data: {
              authCode: res.authCode
            },
            dataType: 'json',
            success: (res) => {
              let result = res.data;

              let open_id = result.data.user.open_id;
              let name = result.data.user.name;
              let mobile = result.data.user.phone;

              this.setData({
                open_id: open_id,
                user_name: name,
                user_mobile: mobile
              });

              dd.setStorageSync({
                key: 'user',
                data: {
                  open_id: open_id,
                  user_name: name,
                  user_mobile: mobile
                }
              });

            },
            fail: (res) => {
              dd.alert({ content: JSON.stringify(res) });
            }
          });
        },
        fail: (err) => {
          dd.alert({
            content: JSON.stringify(err)
          })
        }
      })
    }
  },


});
