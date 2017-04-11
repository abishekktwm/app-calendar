xcomponent.create({
  tag: 'calendar',
  url: 'http://localhost:4000'
});

window.xprops.initCall({
  'pipe-buttons': function(t, board) {
    return [
      {
        icon: './images/icon.png',
        text: "Calendar",
        callback: function(p){
          return p.modal({
            url: './calendar.html',
            width: '1200px',
            height: '1000px'
          });
        }
      },
      {
        icon: './images/icon.png',
        text: "Google",
        url: "http://google.com.br",
        target: 'blank',
      },
    ];
  }
});
