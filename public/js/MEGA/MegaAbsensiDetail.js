$("#side-absensi").addClass("sidelist-selected")

let URL_ID = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);

const bulanInput = document.getElementById('filter-bulan');

const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Tambah 1 karena indeks bulan dimulai dari 0

bulanInput.value = `${year}-${month}`;
$("#filter-absensi").text(`${monthNames[+month-1]} ${year}`)

$.get(`/api/v1/karyawan/${URL_ID}`, async (karyawanData) => {
  $("#first-name").text(karyawanData.nama.split(" ")[0])
  $("#nama-karyawan").text(karyawanData.nama)
  $("#devisi-karyawan").text(karyawanData.devisi)

  $("#filter-bulan").change(function(){
    $("#filter-absensi").text(`${formatDate(this.value)}`)
    $("#table-absensi").DataTable().destroy()

    let selectedDate = this.value.split("-");
  
    drawTable(karyawanData.kehadiran, +selectedDate[1], +selectedDate[0])
  })

  $("#bg-nothing").remove()
  $("#table-absensi").removeClass("hidden")
  drawTable(karyawanData.kehadiran, +month, +year)
})

function formatDateWithDay(inputDate) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  // Memisahkan hari, bulan, dan tahun dari inputDate
  const dateArray = inputDate.split('-');
  const day = parseInt(dateArray[0], 10);
  const month = parseInt(dateArray[1], 10);
  const year = parseInt(dateArray[2], 10);

  // Membuat objek tanggal dengan tanggal yang diambil dari inputDate
  const dateObj = new Date(year, month - 1, day);

  const dayName = days[dateObj.getDay()];
  const monthName = months[dateObj.getMonth()];

  return `${dayName}, ${day}-${monthName}-${year}`;
}
function formatDate(inputDate) {
  const [year, month] = inputDate.split('-');
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const formattedDate = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  return formattedDate;
}

function drawTable(kehadiran, month, year){
  let filteredKehadiran = kehadiran.filter(item => {
    const tanggalArr = item.tanggal.split('-');
    const monthFromData = parseInt(tanggalArr[1], 10);
    const yearFromData = parseInt(tanggalArr[2], 10);

    // Sesuaikan dengan bulan dan tahun yang diinginkan
    return monthFromData === month && yearFromData === year;
  })


  $("#table-absensi").DataTable({
    data: filteredKehadiran,
    columns: [
      {
        data: null,
        width:"5%",
        render: function (data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        },
      },
      { 
        data: "tanggal",
        render: function(data){
          return formatDateWithDay(data)
        }
      },
      { data: "jam_masuk" },
      { data: "lokasi" },
      { 
          data: "status_kehadiran", 
          width: "15%",
          render: function(data){
            return data ? `<p class="font-bold text-main">Hadir</p>` : `<p class="font-bold">Tidak hadir</p>`
          }   
      },
    ],
    "createdRow": function (row, data, dataIndex) {
      if (!data.status_kehadiran) {
          $(row).addClass('red-row');
      }
    }
  });
}
