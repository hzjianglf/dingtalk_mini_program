let domain = "https://bc.xllzj.com/api";

Page({
  data: {
    open_id: '',
    user_name: '',
    user_mobile: '',
    cancel_lunch_order_num: 0,
    cancel_dinner_order_num: 0,
  },

  onLoad() {
    var _this = this;
    let user = dd.getStorageSync({ key: 'user' });
    if (user.data.open_id) {
      _this.setData(user.data);
    } else {
      _this.loginSystem();
    }
  },

  onShow() {
    this.statInfo();
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

            }
          });
        }
      })
    }
  },

  /**
   * 统计信息
   */
  statInfo() {
    let url = domain + '/user/stat';
    let open_id = this.data.open_id;

    dd.httpRequest({
      url: url,
      method: 'GET',
      data: {
        open_id: open_id
      },
      dataType: 'json',
      success: (res) => {
        let result = res.data.data;
        this.setData({
          cancel_lunch_order_num: result.order.cancel_lunch_order_num,
          cancel_dinner_order_num: result.order.cancel_dinner_order_num
        });
      }
    });
  },

  toOrderList(e) {
    let page = '../order/index';
    let order_type = e.currentTarget.dataset.type;

    dd.navigateTo({
      url: page + '?order_type=' + order_type
    })
  },
});
