 document.addEventListener("DOMContentLoaded", function() {
     var timeButton = document.querySelector('.time'),
         dataButton = document.querySelector('.getJSON');

     timeButton.addEventListener('click', time, false);
     dataButton.addEventListener('click', loadJSON, false);


     function time() {
         var xhr = new XMLHttpRequest();

         xhr.open('GET', 'fluffy', true);

         xhr.onreadystatechange = function() {
             if (xhr.readyState === 4 && xhr.status === 200) {
                 writeTime(xhr.responseText);
             }
         };
         xhr.send();
     }

     function writeTime(text) {
         var div = document.querySelector('#log');
         div.innerHTML = text;
     }

     function loadJSON() {

         var xhr = new XMLHttpRequest();

         xhr.open('GET', 'json', true);

         xhr.send();

         xhr.onreadystatechange = function() {

             if (xhr.readyState === 4 && xhr.status === 200) {
                 showJSON(xhr.responseText);
             }
         }
     }

     function showJSON(students) {
         var parsestudents = JSON.parse(students);

         parsestudents.forEach(function(student) {
             var li = list.appendChild(document.createElement('li'));
             li.innerHTML = student.name + ' ' + student.lastname + ' ' + student.gender + ' ' + student.skype + ' ' + student.email;
         });
     }
 });