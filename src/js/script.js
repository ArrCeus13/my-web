$(document).ready(function(){

    // Toggle menu
    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');
    });

    // Handle scroll events
    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');

        if($(window).scrollTop() > 0){
            $('.top').show();
        }else{
            $('.top').hide();
        }
    });

    // Download file functionality
    $('#downloadBtn').on('click', function() {
        const cvUrl = '/cv/Profile.pdf'; // sesuaikan URL file PDF
        const fileName = cvUrl.substring(cvUrl.lastIndexOf("/") + 1);
        const link = document.createElement("a");
        link.href = cvUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Smooth scrolling untuk anchor
    $('a[href*="#"]').on('click', function(e){
        e.preventDefault();

        const target = $($(this).attr('href'));
        if(target.length){
            $('html, body').animate({
                scrollTop : target.offset().top,
            }, 500, 'linear');
        }
    });

    // Submit form dengan validasi
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        const name = $('#contactForm input[name="name"]').val().trim();
        const email = $('#contactForm input[name="email"]').val().trim();
        const message = $('#contactForm textarea[name="message"]').val().trim();

        if (!name || !email || !message) {
            alert('Harap isi semua bidang form!');
            return;
        }

        const formData = {name, email, message};

        $.ajax({
            type: 'POST',
            url: 'https://arrizafajar.vercel.app/api/submit', // sesuaikan dengan API endpoint
            data: formData,
            success: function(response) {
                alert('Form berhasil dikirim!');
                $('#contactForm')[0].reset();
            },
            error: function(xhr, status, error) {
                alert('Gagal mengirim form, coba lagi nanti.');
                console.error('Error:', error);
            }
        });
    });

    // Dynamic age calculation with months and days
    function calculateDetailedAge(birthDate) {
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        return `${years} tahun ${months} bulan ${days} hari`;
    }

    const birthDate = new Date(2002, 0, 1); // sesuaikan tanggal lahir
    $('#age').text(calculateDetailedAge(birthDate));

});
