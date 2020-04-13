let domain = "http://bc.xllzj.com/api";
let url = domain + '/user/login';

App({
  onLaunch(options) {
    // 第一次打开
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  globalData: {
    crmList: [
      {
        icon: 'icon-edit',
        title: '我的反馈',
        page: '/pages/index/index',
        type: '1',
        isShow: true
      }, 
      {
        icon: 'icon-team',
        title: '我的客户',
        page: '/pages/crm/crm',
        type: '2',
        isShow: true
      }, 
      {
        icon: 'icon-carryout',
        title: '我的任务',
        page: '/pages/work/work',
        type: '3',
        isShow: true
      }, 
      {
        icon: 'icon-accountbook',
        title: '我的订单',
        page: '/pages/user/user',
        type: '4',
        isShow: true
      }, 
      {
        icon: 'icon-notification',
        title: '消息',
        page: '/pages/index/index',
        type: '5',
        isShow: false
      }, 
      {
        icon: 'icon-contacts',
        title: '联系人',
        page: '/pages/crm/crm',
        type: '6',
        isShow: false
      }, 
      {
        icon: 'icon-addteam',
        title: '合作伙伴',
        page: '/pages/work/work',
        type: '7',
        isShow: false
      }, 
      {
        icon: 'icon-solution',
        title: '供应商',
        page: '/pages/user/user',
        type: '8',
        isShow: false
      }, 
      {
        icon: 'icon-linechart',
        title: '销售任务',
        page: '/pages/user/user',
        type: '9',
        isShow: false
      }
    ]
  }
});
