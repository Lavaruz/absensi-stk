$("#side-karyawan").addClass("sidelist-selected")

$("#button-tambah").click(function(){
  $("#popup-tambah-karyawan").removeClass("hidden")
  $("#popup").removeClass("hidden")
})
$(".close-x").click(function(){
  $(this).closest(".popup").addClass("hidden")
  $("#popup").addClass("hidden")
})

$("#bg-table-karyawan").on("click", ".edit-karyawan", function(){
  $("#popup-edit-karyawan").removeClass("hidden")
  $("#popup").removeClass("hidden")
  $.get("/api/v1/devisi", async (devisiData) => {
    devisiData.forEach(devisi => $("#popup-edit-karyawan select[name=devisi]").append(`<option value="${devisi.nama_devisi}">${devisi.nama_devisi}</option>`))
    $.get(`/api/v1/karyawan/${$(this).find("p").text()}`, async (data) => {
      $("#popup-edit-karyawan input[name=nik]").val(data.nik)
      $("#popup-edit-karyawan input[name=nama]").val(data.nama)
      $("#popup-edit-karyawan input[name=telp]").val(data.telp)
      $("#popup-edit-karyawan input[name=email]").val(data.email)
      $("#popup-edit-karyawan select[name=devisi]").val(data.devisi)
      $("#form-edit-karyawan").on("submit", function (e) {
          e.preventDefault();
          const formData = new FormData(this);
          $.ajax({
            url: `/api/v1/karyawan/${data.unique_id}`,
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
    })
  })
})
$("#bg-table-karyawan").on("click", ".delete-karyawan", function(){
  let karyawanId = $(this).find("p").text()
  $.ajax({
      url: `/api/v1/karyawan/${karyawanId}`,
      type: "DELETE",
      contentType: false,
      enctype: "multipart/form-data",
      processData: false,
      success: function (response) {
          console.log(response);
          location.reload()
      },
      error: function (data, status, error) {
      const ErrorMessage = `<div id="ErrorMessage" class="bg-red-500/80 fixed top-8 left-1/2 -translate-x-1/2 min-w-[400px] text-center py-1.5 rounded-lg border border-red-900 text-[#000] text-sm z-10">${status}</div>`
      $("body").prepend(ErrorMessage)
      $("#ErrorMessage")
          .delay(3000)
          .fadeOut("slow", function () {
          $(this).remove();
          });
      },
  });
})

$("#form-tambah-karyawan").on("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  $.ajax({
    url: "/api/v1/karyawan",
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


$.get("/api/v1/devisi", async (devisiData) => {
  devisiData.forEach(devisi => {
    $("#select-devisi").append(`<option value="${devisi.nama_devisi}">${devisi.nama_devisi}</option>`)
  });
})

$.get("/api/v1/karyawan", async (data) => {
    $("#bg-nothing").remove()
    $("#table-karyawan").removeClass("hidden")
    $("#table-karyawan").DataTable({
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
        { data: "telp" },
        { data: "email" },
        { data: "devisi" },
        {
          data: "unique_id",
          width:"5%",
          render: function (data) {
            return `<button type="button" class="edit-karyawan"><i class="uil uil-edit text-main"></i><p class="hidden">${data}</p></button>`;
          },
        },
        {
          data: "unique_id",
          width:"5%",
          render: function (data) {
            return `<button type="button" class="delete-karyawan"><i class="uil uil-trash-alt text-red-500"></i><p class="hidden">${data}</p></button>`;
          },
        },
      ],
    });
});