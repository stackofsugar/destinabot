let selectedDataIndex;
let submittedDataIndex;

$(() => {
  console.log(
    '%cNever Gonna Give You Up',
    'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%'
  );
  let customTabActive = !!$(`.active[id=tab-custom-btn]`)[0];
  let demoTabActive = !customTabActive;
  reloadTab(demoTabActive);
});

function reloadTab(demoActive) {
  let active = demoActive ? 'demo' : 'custom';
  let inactive = demoActive ? 'custom' : 'demo';
  $(`[id=tab-${active}-btn]`).first().addClass('active');
  $(`[id=tab-${inactive}-btn]`).first().removeClass('active');
  $(`[id=tab-${active}]`).first().show();
  $(`[id=tab-${inactive}]`).first().hide();
}

function jsonToTable(index) {
  selectedDataIndex = index;
  $('[id=top-primary-table]').empty();
  $('.show-when-dataset-selected').removeClass('collapse');
  $('[id=top-table-wrapper]').addClass('d-flex');
  for (let i = 0; i < demoData[index].name.length; i++) {
    $('[id=top-primary-table]').append(`
      <tr>
        <th class="text-center" scope="row">${i + 1}</th>
        <td>${demoData[index].name[i]}</td>
        <td>${demoData[index].open[i]}</td>
        <td>${demoData[index].close[i]}</td>
        <td>${demoData[index].optimal[i]}</td>
        <td>${demoData[index].duration[i]}</td>
      </tr>
    `);
  }
}

function submitDatasetChoice() {
  submittedDataIndex = selectedDataIndex;
  $('.show-when-run-ready').show();
  $('[id=input-data-warning]').hide();
  $('[id=bottom-primary-table]').empty();
  for (let i = 0; i < demoData[submittedDataIndex].name.length; i++) {
    $('[id=bottom-primary-table]').append(`
      <tr>
        <th class="text-center" scope="row">${i + 1}</th>
        <td>${demoData[submittedDataIndex].name[i]}</td>
        <td>${demoData[submittedDataIndex].open[i]}</td>
        <td>${demoData[submittedDataIndex].close[i]}</td>
        <td>${demoData[submittedDataIndex].optimal[i]}</td>
        <td>${demoData[submittedDataIndex].duration[i]}</td>
      </tr>
    `);
  }
}

function runAlgorithm() {
  $('[id=result-table]').empty();
  $('[id=algo-spinner]').first().removeClass('collapse');
  let params = {
    verbose: $('[id=verbose-mode]').first().is(':checked'),
    startTrip: $('[id=start-trip]').first().val(),
    numGeneration: Number($('[id=no-generation]').first().val()),
    populationSize: Number($('[id=pop-size]').first().val()),
    mutationProb: Number($('[id=mutation-prob]').first().val()),
    crossoverProb: Number($('[id=crossover-prob]').first().val()),
    log: false,
  };
  try {
    let result = run(demoData[submittedDataIndex], params);
    let intepretation = interpret(result.bestIndividual, demoData[submittedDataIndex], params.startTrip);
    $('.show-when-run-finished').show();
    $('[id=final-fitness]').text(Number(result.fitness).toPrecision(4));
    for (let i = 0; i < intepretation.name.length; i++) {
      $('[id=result-table]').append(`
      <tr>
        <th class="text-center" scope="row">${i + 1}</th>
        <td>${intepretation.name[i]}</td>
        <td>${intepretation.in[i]}</td>
        <td>${intepretation.out[i]}</td>
        <td>${intepretation.drivingTime[i]}</td>
      </tr>
    `);
    }
    $('[id=algo-spinner]').first().addClass('collapse');
  } catch (error) {
    alert(error.message);
  }
}

const demoData = [
  {
    name: [
      'Soto Ayam Lamongan Cak Har',
      'Adventure Land Romokalisari',
      'Kampung Heritage Peneleh',
      'Surabaya Kriya Gallery (SKG) MERR',
      'Masjid Al-Akbar Surabaya',
      'Tunjungan Romansa',
    ],
    open: ['06:00', '08:00', '09:00', '08:00', '00:00', '00:00'],
    close: ['23:59', '16:00', '17:00', '19:00', '23:59', '23:59'],
    optimal: ['08:00', '12:00', '12:00', '09:00', '17:30', '09:00'],
    duration: [60, 90, 120, 90, 60, 90],
    drivingDuration: [
      [0, 60, 34, 10, 27, 30],
      [52, 0, 29, 52, 37, 32],
      [31, 35, 0, 33, 32, 8],
      [5, 57, 37, 0, 23, 35],
      [31, 45, 38, 29, 0, 36],
      [25, 33, 10, 26, 30, 0],
    ],
  },

  {
    name: ['Hutan Bambu Keputih', 'Masjid Cheng Ho', 'Sentra Kuliner G-Walk', 'Kenjeran Park', 'Museum Blockbuster', 'Wisata Pecinan Kapasan Dalam'],
    open: ['00:00', '04:00', '09:00', '09:00', '12:00', '06:00'],
    close: ['23:59', '22:00', '22:00', '17:00', '19:00', '22:00'],
    optimal: ['15:00', '10:00', '13:00', '09:00', '17:00', '20:00'],
    duration: [60, 45, 90, 90, 90, 120],
    drivingDuration: [
      [0, 36, 61, 19, 22, 41],
      [32, 0, 43, 24, 18, 10],
      [57, 45, 0, 61, 56, 45],
      [18, 22, 64, 0, 7, 22],
      [21, 19, 66, 8, 0, 19],
      [38, 9, 46, 25, 19, 0],
    ],
  },
  {
    name: [
      'Ekowisata Mangrove Wonorejo',
      'Visma Art & Design Gallery',
      'Kota Tua Surabaya',
      'Mirota Batik & Handicraft Surabaya',
      'Alun - Alun Surabaya',
      'Rawon Kalkulator',
    ],
    open: ['08:00', '08:00', '00:00', '10:00', '08:00', '09:00'],
    close: ['16:00', '20:00', '23:59', '19:00', '21:00', '23:59'],
    optimal: ['09:00', '11:00', '13:00', '17:00', '19:00', '21:00'],
    duration: [60, 60, 90, 60, 60, 90],
    drivingDuration: [
      [0, 49, 57, 42, 46, 37],
      [42, 0, 13, 11, 5, 15],
      [53, 21, 0, 19, 18, 25],
      [33, 9, 19, 0, 11, 8],
      [38, 5, 16, 7, 0, 10],
      [30, 13, 25, 11, 14, 0],
    ],
  },
];

// dignoGA-min
// MIT Licensed
function parseTime(e) {
  [hour_string, minutes_string] = e.split(':');
  let t = parseInt(hour_string, 10),
    r = parseInt(minutes_string, 10);
  if (!Number.isInteger(t) || !Number.isInteger(r)) throw new Error(`The time specified are invalid integers: ${hour_string}:${minutes_string}`);
  if (r > 59) throw new Error(`The time specified are invalid: No such time as ${hour_string}:${minutes_string}`);
  if (t > 24 || (24 == t && r > 0)) throw new Error(`The time specified are invalid: ${hour_string}:${minutes_string} exceeds the max of 24:00`);
  return 24 == t && ((t = 23), (r = 59)), (time = (t + r / 60) / 24), time;
}
function unparseTime(e) {
  let t = 24 * e,
    r = parseInt(t) + '',
    n = Math.round(60 * (t - r)) + '';
  return `${r.padStart(2, '0')}:${n.padStart(2, '0')}`;
}
function parseDuration(e) {
  if (!Number.isInteger(e)) throw new Error(`Duration must be a valid integer: ${e}`);
  if (e < 1) throw new Error(`Duration must be more than 1 minutes: ${e}`);
  if (e > 720) throw new Error(`Duration can't be more than 12 hours: ${e} (${e / 60} hours)`);
  return e / 1440;
}
function unparseDuration(e) {
  return 1440 * e;
}
function initPopulation(e, t) {
  let r = [];
  for (let n = 0; n < e; n++) (chromosome = shuffle([...Array(t).keys()])), r.push(chromosome);
  return r;
}
function getRandomInt(e, t) {
  return (e = Math.ceil(e)), (t = Math.floor(t)), Math.floor(Math.random() * (t - e + 1)) + e;
}
function shuffle(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    const r = Math.floor(Math.random() * (t + 1));
    [e[t], e[r]] = [e[r], e[t]];
  }
  return e;
}
function calculateFitness(e, t, r) {
  let n = 0,
    o = { in: [], out: [], open: [], close: [], optimal: [] };
  if (new Set(e).size !== e.length) throw new Error(`Individual in a chromosome can't be duplicated: ${e}`);
  e.forEach((n, i) => {
    let s;
    (s = 0 == i ? parseTime(r) : o.out[i - 1] + parseDuration(t.drivingDuration[e[i - 1]][n])),
      o.in.push(s),
      o.out.push(s + parseDuration(t.duration[n])),
      o.open.push(parseTime(t.open[n])),
      o.close.push(parseTime(t.close[n])),
      o.optimal.push(parseTime(t.optimal[n]));
  });
  for (let t = 0; t < e.length; t++)
    if (o.optimal[t] > o.in[t] && o.optimal[t] < o.out[t]) n += 0;
    else if (o.in[t] > o.open[t] && o.out[t] < o.close[t]) {
      let e;
      (e = o.in[t] > o.optimal[t] ? 20 * (o.in[t] - o.optimal[t]) : 20 * (o.optimal[t] - o.out[t])), (n += e);
    } else n += 100;
  return n;
}
function mutate(e) {
  let t = getRandomInt(0, e.length - 1),
    r = -1;
  do {
    r = getRandomInt(0, e.length - 1);
  } while (r == t);
  let n = e[t];
  return (e[t] = e[r]), (e[r] = n), e;
}
function sortIndices(e) {
  for (var t = 0; t < e.length; t++) e[t] = [e[t], t];
  e.sort(function (e, t) {
    return e[0] > t[0] ? -1 : 1;
  }),
    (e.sortIndices = []);
  for (var r = 0; r < e.length; r++) e.sortIndices.push(e[r][1]), (e[r] = e[r][0]);
  return e.sortIndices;
}
function orderedCrossover(e, t) {
  let r = [],
    n = Math.floor(e.length / 2);
  return (
    (r = e.slice(n)),
    t.map((e) => {
      r.includes(e) || r.push(e);
    }),
    r
  );
}
function selectn(e, t, n, o) {
  let i,
    s = 0,
    a = [],
    u = [],
    l = [],
    p = [];
  e.map((e) => {
    (i = 1 / (1 + calculateFitness(e, n, o))), a.push(i), (s += i);
  }),
    a.map((e) => {
      l.push(e / s);
    });
  for (let e = 0; e < l.length; e++) p.push(l.slice(0, e + 1).reduce((e, t) => e + t, 0));
  for (let n = 0; n < t; n++) {
    r = Math.random();
    for (let t = 0; t < e.length; t++)
      if (r <= p[t]) {
        u.push(e[n]);
        break;
      }
  }
  return u;
}
function run(e, t = {}) {
  let r = {
      numGeneration: 100,
      startTrip: '08:30',
      populationSize: 20,
      mutationProb: 0.4,
      crossoverProb: 0.5,
      log: !0,
      ...t,
    },
    n = e.name.length;
  if (e.open.length != n || e.close.length != n || e.optimal.length != n || e.duration.length != n || e.drivingDuration.length != n)
    throw new Error('Input data is jagged');
  if (
    (e.drivingDuration.map((e) => {
      if (e.length != n) throw new Error('Input data is jagged');
    }),
    r.crossoverProb + r.mutationProb > 1)
  )
    throw new Error("Crossover and Mutation Probability can't be more than 1");
  let o,
    i,
    s,
    a,
    u,
    l = initPopulation(r.populationSize, e.open.length);
  r.log && (console.log('Initial Population:'), console.log(l));
  let p = Number.MAX_SAFE_INTEGER,
    h = [],
    m = [];
  for (let t = 0; t <= r.numGeneration; t++) {
    (u = p),
      (s = []),
      l.map((t) => {
        s.push(calculateFitness(t, e, r.startTrip));
      }),
      (m = sortIndices(s.slice()));
    let n = [];
    for (n.push(l[m[0]]), h = [r.crossoverProb, r.mutationProb + r.crossoverProb, 1]; n.length < r.populationSize; ) {
      o = Math.random();
      for (let e = 0; e < 3; e++)
        if (o <= h[e]) {
          i = e;
          break;
        }
      if (0 == i) {
        let t = selectn(l, 2, e, r.startTrip);
        (t = orderedCrossover(t[0], t[1])), n.push(t);
      } else if (1 == i) {
        let t = selectn(l, 1, e, r.startTrip)[0];
        (t = mutate(t)), n.push(t);
      } else {
        let t = selectn(l, 1, e, r.startTrip)[0];
        n.push(t);
      }
    }
    (l = n),
      l.map((t) => {
        let n = calculateFitness(t, e, r.startTrip);
        p > n && ((p = n), (a = t));
      }),
      r.log && (console.log(`== Generation ${t} ==`), console.log(`Best individual: ${a.join(' ')}`), console.log(`Min fitness: ${p}`));
  }
  return { bestIndividual: a, fitness: p };
}
function interpret(e, t, r) {
  let n = { name: [], in: [], out: [], drivingTime: [] };
  return (
    e.forEach((o, i) => {
      let s, a;
      0 == i
        ? ((s = parseTime(r)), (a = 0))
        : ((s = n.out[i - 1] + parseDuration(t.drivingDuration[e[i - 1]][o])), (a = t.drivingDuration[e[i - 1]][o])),
        n.name.push(t.name[o]),
        n.in.push(s),
        n.out.push(s + parseDuration(t.duration[o])),
        n.drivingTime.push(a);
    }),
    (n.in = n.in.map((e) => unparseTime(e))),
    (n.out = n.out.map((e) => unparseTime(e))),
    n
  );
}
