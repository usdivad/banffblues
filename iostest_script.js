//document.getElementById("khom").click(k);
$("#khom").click(j);


//i() doesn't work because of global var declaration
var osc_ne = T("konami");
var env_ne = T("adsr", {a:10, d:300, s:0.25, r:700});
var oe_ne = T("OscGen", {osc:osc_nw, env:env_nw, mul:1}).play();
function i() {
  var noteNum = 80;
  var velocity = 100;

  oe_nw.noteOn(noteNum, velocity);
  console.log("i");
}

//j DOES work
function j() {
  var osc_nw = T("konami");
  var env_nw = T("adsr", {a:10, d:300, s:0.25, r:700});
  var oe_nw = T("OscGen", {osc:osc_nw, env:env_nw, mul:1}).play();

  var noteNum = 80;
  var velocity = 100;

  oe_nw.noteOn(noteNum, velocity);
  console.log("j");

}

function k() {
    	var formants = {
      a:[700, 1200, 2900],
      i:[300, 2700, 2700],
      u:[390, 1200, 2500],
      e:[450, 1750, 2750],
      o:[460,  880, 2800]
    }, freq, synth, f1, f2, f3;

    freq = 174.61412048339844;
    freq = T("+.kr", freq, T("sin.kr", {freq:3, mul:0.8}));

    synth = T("saw", {freq:freq});

    f1 = T("bpf", {freq:T("param", {value: 700}), Q:9}, synth);
    f2 = T("bpf", {freq:T("param", {value:1200}), Q:9}, synth);
    f3 = T("bpf", {freq:T("param", {value:2900}), Q:9}, synth);
    synth = T("+", f1, f2, f3);
    synth = T("bpf", {freq:3200, Q:0.5}, synth);

    T("interval", {interval:250}, function() {
      var f = formants["aiueo"[(Math.random()*5)|0]];
      f1.freq.linTo(f[0], 150);
      f2.freq.linTo(f[1], 150);
      f3.freq.linTo(f[2], 150);
    }).set({buddies:synth}).start();

    console.log("asdf");
}