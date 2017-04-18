xcomponent.create({
  tag: 'calendar',
  url: window.location.href
});

window.xprops.initCall({
  'pipe-buttons': function(t, board) {
    return [
      {
        icon: 'pp-ico-calendar',
        text: 'Calendar',
        callback: function(p){
          return p.modal({
            url: './calendar.html',
            width: '100%',
            height: '100%'
          });
        }
      }
    ];
  }
});
