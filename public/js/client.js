xcomponent.create({
  tag: 'calendar',
  url: 'http://localhost:4000'
});

window.xprops.initCall({
  'pipe-buttons': function(t, board) {
    return [
      {
        icon: './images/icon.png',
        text: "Calendar 2",
        callback: function(p){
          return p.modal({
            url: './calendar.html'
          });
        }
      }
    ];
  }
});
