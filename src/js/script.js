$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');
    });

    $(window).on('scroll load',function(){

        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');

        if($(window).scrollTop() > 0){
            $('.top').show();
        }else{
            $('.top').hide();
        }

    });

    // Add an event listener to the download button
    $('#downloadBtn').on('click', function() {
        var cvUrl = './src/cv/Profile.pdf'; // Replace with the actual path to your PDF file
        var fileName = cvUrl.substring(cvUrl.lastIndexOf("/") + 1); // Extract file name
        var link = document.createElement("a");
        link.setAttribute("href", cvUrl);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click(); // Programmatically trigger the download
        document.body.removeChild(link); // Clean up
    });

    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop : $($(this).attr('href')).offset().top,
        },
            500,
            'linear'
        );
    });

    // Add event listener to the form submission button
    $('#contactForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        var formData = {
            name: $('#contactForm input[name="name"]').val(),
            email: $('#contactForm input[name="email"]').val(),
            message: $('#contactForm textarea[name="message"]').val()
        };

        // Send form data to the API endpoint
        $.ajax({
            type: 'POST',
            url: 'https://arrizafajar.vercel.app/api/submit', // Replace with your API endpoint
            data: formData,
            success: function(response) {
                // Handle success response
                alert('Form submitted successfully!');
                // Clear the form fields if needed
                $('#contactForm')[0].reset();
            },
            error: function(xhr, status, error) {
                // Handle error response
                alert('Form submission failed. Please try again.');
                console.error('Error:', error);
            }
        });
    });

});
