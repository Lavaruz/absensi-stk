$("#side-devisi").addClass("sidelist-selected")

$(".close-x").click(function(){
    $(this).closest(".popup").addClass("hidden")
    $("#popup").addClass("hidden")
})
$("#button-tambah").click(function(){
    $("#popup-tambah-devisi").removeClass("hidden")
    $("#popup").removeClass("hidden")
})
$("#bg-table-devisi").on("click", ".edit-devisi", function(){
    $("#popup-edit-devisi").removeClass("hidden")
    $("#popup").removeClass("hidden")
    $.get(`/api/v1/devisi/${$(this).find("p").text()}`, async (data) => {
        $("#popup-edit-devisi input[name=nama_devisi]").val(data.nama_devisi)
        $("#form-edit-devisi").on("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);
          
            $.ajax({
              url: `/api/v1/devisi/${data.unique_id}`,
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
$("#bg-table-devisi").on("click", ".delete-devisi", function(){
    let devisiId = $(this).find("p").text()
    $.ajax({
        url: `/api/v1/devisi/${devisiId}`,
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

$("#form-tambah-devisi").on("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
  
    $.ajax({
      url: "/api/v1/devisi",
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

$.get("/api/v1/devisi", async (data) => {
    $("#bg-nothing").remove()
    $("#table-devisi").removeClass("hidden")
    $("#table-devisi").DataTable({
      data: data,
      columns: [
        {
          data: null,
          width:"5%",
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          },
        },
        { data: "nama_devisi" },
        {
          data: "unique_id",
          width:"5%",
          render: function (data) {
            return `<button type="button" class="edit-devisi"><i class="uil uil-edit text-main"></i><p class="hidden">${data}</p></button>`;
          },
        },
        {
          data: "unique_id",
          width:"5%",
          render: function (data) {
            return `<button type="button" class="delete-devisi"><i class="uil uil-trash-alt text-red-500"></i><p class="hidden">${data}</p></button>`;
          },
        },
      ],
    });
});