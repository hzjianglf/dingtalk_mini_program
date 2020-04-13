let domain = "https://bc.xllzj.com/api";

Page({
  data: {
    open_id: '',
    user_name: '',
    user_mobile: '',
    cancel_lunch_order_id: 0,
    cancel_dinner_order_id: 0
  },

  onLoad() {
    this.loginSystem();
  },

  loginSystem() {
    let _this = this;
    let url = domain + '/user/login';
    let user = dd.getStorageSync({ key: 'user' });
    if (user.data) {
      _this.setData(user.data);
      //获取用户信息
      _this.userInfo();
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

              //获取用户信息
              _this.userInfo();
            }
          });
        }
      })
    }
  },

  /**
   * 用户信息
   */
  userInfo() {
    let url = domain + '/user/info';
    let open_id = this.data.open_id;
    if (open_id) {
      dd.httpRequest({
        url: url,
        method: 'GET',
        data: {
          open_id: open_id
        },
        dataType: 'json',
        success: (res) => {
          if (res.data.code) {
            let result = res.data.data;
            this.setData({
              cancel_lunch_order_id: result.order.cancel_lunch_order_id,
              cancel_dinner_order_id: result.order.cancel_dinner_order_id
            });
          } else {
            console.log('999');
            this.loginSystem();
          }
        }
      });
    } else {
      this.loginSystem();
    }
  },

  /**
   * 取消午餐
   */
  submitLunch() {
    let url = domain + '/order/handle';
    let open_id = this.data.open_id;
    let cancel_lunch_order_id = this.data.cancel_lunch_order_id;
    let confirm_content;
    if (this.data.cancel_lunch_order_id) {
      confirm_content = '申请中午用餐？';
    } else {
      confirm_content = '申请中午不用餐？';
    }

    dd.confirm({
      title: '温馨提示',
      content: confirm_content,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          dd.httpRequest({
            url: url,
            method: 'POST',
            data: {
              open_id: open_id,
              cancel_lunch_order_id: cancel_lunch_order_id,
              order_type: 1
            },
            dataType: 'json',
            success: (res) => {
              if (res.data.code) {
                let result = res.data.data;

                this.setData({
                  cancel_lunch_order_id: result.order_id
                });

                dd.showToast({
                  type: 'success',
                  content: res.data.msg,
                  duration: 1000
                });
              } else {
                dd.showToast({
                  type: 'error',
                  content: res.data.msg,
                  duration: 1000
                });
              }
            }
          });
        }
      }
    });
  },

  /**
   * 取消晚餐
   */
  submitDinner() {
    let url = domain + '/order/handle';
    let open_id = this.data.open_id;
    let cancel_dinner_order_id = this.data.cancel_dinner_order_id;
    let confirm_content;
    if (this.data.cancel_dinner_order_id) {
      confirm_content = '申请下午用餐？';
    } else {
      confirm_content = '申请下午不用餐？';
    }

    dd.confirm({
      title: '温馨提示',
      content: confirm_content,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          dd.httpRequest({
            url: url,
            method: 'POST',
            data: {
              open_id: open_id,
              cancel_dinner_order_id: cancel_dinner_order_id,
              order_type: 2
            },
            dataType: 'json',
            success: (res) => {
              if (res.data.code) {
                let result = res.data.data;

                this.setData({
                  cancel_dinner_order_id: result.order_id
                });

                dd.showToast({
                  type: 'success',
                  content: res.data.msg,
                  duration: 1000
                });
              } else {
                dd.showToast({
                  type: 'error',
                  content: res.data.msg,
                  duration: 1000
                });
              }
            }
          });
        }
      }
    });
  },
});
