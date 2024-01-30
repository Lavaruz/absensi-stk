$("#side-profile").addClass("sidelist-selected")
const USER_ID = $("#user_id").text()

$.get(`/api/v1/karyawan/${USER_ID}`, function(karyawanData){
    $("input[name=nik]").val(karyawanData.nik)
    $("input[name=nama]").val(karyawanData.nama)
    $("input[name=telp]").val(karyawanData.telp)
    $("input[name=email]").val(karyawanData.email)
    $("#user-name").text(karyawanData.nama)
    $("#user-devisi").text(karyawanData.devisi)

    if(karyawanData.foto_profile){
      $("#profile-picture").prop("src",karyawanData.foto_profile)
      $("#sidebar-profile-picture").prop("src",karyawanData.foto_profile)
    }
})

$("#button-profile-picture").click(function(){$("#input-profile-picture").click()})
$("#input-profile-picture").change(function(){
  let selectedImage = this.files[0];
  if(selectedImage){
      if(selectedImage.size > 2097152){
          $(this).prop("type","text").prop("type","file")
          $("#file-too-large").removeClass("invisible")
          setTimeout(function() {
              $("#file-too-large").addClass("invisible");
          }, 2500);
      }else{
          const form_update = document.getElementById("form-profile-picture");
          let formData = new FormData(form_update)
          $.ajax({
              url: `/api/v1/karyawan/${USER_ID}`,
              type: "PUT",
              data: formData,
              cache: false,
              contentType: false,
              processData: false,
              encrypt: "multipart/form-data",
              success: (response) => {
                  location.reload()
              },
              error: function (request, status, error) {
                  alert("Error!")
              },
          }).submit();
      }
  }
})

$("#form-edit-profile").on("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
  
    $.ajax({
      url: `/api/v1/karyawan/${USER_ID}`,
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