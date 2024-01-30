$("#side-dashboard").addClass("sidelist-selected")
const USER_ID = $("#user_id").text()

$("#form-checkin").on("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
  
    $.ajax({
      url: `/api/v1/karyawan/${USER_ID}/checkin`,
      type: "POST",
      data: formData,
      contentType: false,
      enctype: "multipart/form-data",
      processData: false,
      success: function (response) {
        location.reload()
      },
      error: function (data, status, error) {
        const ErrorMessage = `<div id="ErrorMessage" class="bg-red-500/80 fixed top-8 left-1/2 -translate-x-1/2 min-w-[400px] text-center py-1.5 rounded-lg border border-red-900 text-[#000] text-sm z-10">${status}: ${data.responseJSON.datas.error}</div>`
        $("body").prepend(ErrorMessage)
        $("#ErrorMessage")
          .delay(3000)
          .fadeOut("slow", function () {
            $(this).remove();
          });
      },
    });
});

$.get(`/api/v1/karyawan/${USER_ID}`, function(karyawanData){
  $("#user-name").text(karyawanData.nama)
  $("#user-devisi").text(karyawanData.devisi)
  if(karyawanData.foto_profile){
    $("#profile-picture").prop("src",karyawanData.foto_profile)
    $("#sidebar-profile-picture").prop("src",karyawanData.foto_profile)
    $("#first-name").text(karyawanData.nama.split(" ")[0])
  }

  $.get("/api/v1/absensi", function(absensiData){

    const canAbsen = isBetween(absensiData.jam_masuk, absensiData.jam_keluar, getWIBTime())

    const HARIINI = karyawanData.kehadiran.find(kehadiran => kehadiran.tanggal == getFormatedToday())

    if(HARIINI){
      $("#status-kehadiran").text("Berhasil").addClass("text-white")
      $("#desc-kehadiran").text("Anda sudah absen hari ini")
      $("#form-checkin button").remove()
    }else if(HARIINI == undefined && canAbsen){
      $("#status-kehadiran").text("Belum Absen")
      $("#desc-kehadiran").text("Anda belum absen hari ini")
      $("#form-checkin button").removeClass("hidden")
      $("#vpn-check").removeClass("hidden")
    }
    else if(HARIINI == undefined && !canAbsen){
      $("#status-kehadiran").text("Tutup")
      $("#desc-kehadiran").text("Saat ini diluar waktu absensi")
      $("#form-checkin button").remove()
    }
  })
  
})

function getFormatedToday() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Ingat, bulan dimulai dari 0 (Januari) hingga 11 (Desember)
  const year = today.getFullYear();

  // Format tanggal dengan nol di depan jika perlu
  const formattedDay = (day < 10) ? `0${day}` : day;
  const formattedMonth = (month < 10) ? `0${month}` : month;

  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
  return formattedDate
}

function getWIBTime() {
  const now = new Date();
  const wibTime = now.toLocaleTimeString('en-ID', { timeZone: 'Asia/Jakarta', hour12: false });

  // Dapatkan hanya jam dan menit
  const hoursAndMinutes = wibTime.split(':').slice(0, 2).join(':');

  return hoursAndMinutes;
}

function isBetween(startTime, endTime, checkTime) {
  const start = new Date(`2022-01-01 ${startTime}`);
  const end = new Date(`2022-01-01 ${endTime}`);
  const check = new Date(`2022-01-01 ${checkTime}`);

  return check >= start && check <= end;
}
