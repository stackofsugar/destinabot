let selectedDataIndex;

$(() => {
  let customTabActive = !!$(`.active[id=tab-custom-btn]`)[0];
  let demoTabActive = !customTabActive;
  reloadTab(demoTabActive);
  // jsonToTable(demoData[0]);
});

function reloadTab(demoActive) {
  let active = demoActive ? 'demo' : 'custom';
  let inactive = demoActive ? 'custom' : 'demo';
  $(`[id=tab-${active}-btn]`).first().addClass('active');
  $(`[id=tab-${inactive}-btn]`).first().removeClass('active');
  $(`[id=tab-${active}]`).first().show();
  $(`[id=tab-${inactive}]`).first().hide();
}

function jsonToTable(data, index) {
  selectedDataIndex = index;
  $('[id=top-primary-table]').empty();
  $('.show-when-dataset-selected').removeClass('collapse');
  $('[id=top-table-wrapper]').addClass('d-flex');
  for (let i = 0; i < data[index].name.length; i++) {
    $('[id=top-primary-table]').append(`
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${data[index].name[i]}</td>
        <td>${data[index].open[i]}</td>
        <td>${data[index].close[i]}</td>
        <td>${data[index].optimal[i]}</td>
        <td>${data[index].duration[i]}</td>
      </tr>
      `);
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
    open: ['A', 'B', 'C', 'D', 'E', 'F'],
    close: ['A', 'B', 'C', 'D', 'E', 'F'],
    optimal: ['A', 'B', 'C', 'D', 'E', 'F'],
    duration: [60, 90, 120, 90, 60, 90],
    drivingDuration: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: [
      'Hutan Bambu Keputih',
      'Masjid Cheng Ho',
      'Sentra Kuliner G-Walk',
      'Kenjeran Park',
      'Museum Blockbuster',
      'Wisata Kampung Pecinan (WKP) Kapasan Dalam',
    ],
    open: ['A', 'B', 'C', 'D', 'E', 'F'],
    close: ['A', 'B', 'C', 'D', 'E', 'F'],
    optimal: ['A', 'B', 'C', 'D', 'E', 'F'],
    duration: [0, 0, 0, 0, 0, 0],
    drivingDuration: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: ['A', 'B', 'C', 'D', 'E', 'F'],
    open: ['A', 'B', 'C', 'D', 'E', 'F'],
    close: ['A', 'B', 'C', 'D', 'E', 'F'],
    optimal: ['A', 'B', 'C', 'D', 'E', 'F'],
    duration: [0, 0, 0, 0, 0, 0],
    drivingDuration: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  },
];
