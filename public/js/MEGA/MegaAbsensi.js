$("#side-absensi").addClass("sidelist-selected")

$(".close-x").click(function(){
  $(this).closest(".popup").addClass("hidden")
  $("#popup").addClass("hidden")
})
$("#button-edit-absensi").click(function(){
  $("#popup-edit-absensi").removeClass("hidden")
  $("#popup").removeClass("hidden")
})

$("#form-edit-absensi").on("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  $.ajax({
    url: "/api/v1/absensi",
    type: "PUT",
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

$.get("/api/v1/absensi", async (data) => {
  $("input[name=jam_masuk]").val(data.jam_masuk)
  $("input[name=jam_keluar]").val(data.jam_keluar)
  $("#jam-absensi").text(`${data.jam_masuk} - ${data.jam_keluar}`)
})

$.get("/api/v1/karyawan", async (data) => {
    $("#bg-nothing").remove()
    $("#table-absensi").removeClass("hidden")
    $("#table-absensi").DataTable({
      data: data,
      columns: [
        {
          data: null,
          width:"5%",
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          },
        },
        { data: "nik" },
        { data: "nama" },
        { data: "devisi" },
        {
          data: "unique_id",
          width:"12%",
          render: function (data) {
            return `<a href="/mega/absensi/${data}" class="edit-karyawan bg-main text-white px-3 py-2 rounded-lg text-xs">Lihat Absen</a>`;
          },
        },
      ],
    });
});