

  document.getElementById('sub').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission

    // 📌 Getting basic info
    const name = document.getElementById('stud').value;
    const usn = document.getElementById('usn').value;
    const cls = document.getElementById('text').value;
    const sem = document.querySelectorAll('#text')[1].value;
    const course = document.getElementById('cour').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'Not Specified';
    const photo = document.getElementById('photo').files[0];

    // 📌 Subject marks input fields
    const subjectIds = ['mnum'];
    const marksInputs = Array.from(document.querySelectorAll('#marks input[type="number"]'));
    const marks = marksInputs.map(input => parseInt(input.value) || 0);
    const subjects = ['Mathematics', 'Physics', 'C Programming', 'Web Programming', 'English', 'Kannada', 'IDT', 'Civil'];

    // 📌 Total and percentage
    const total = marks.reduce((sum, m) => sum + m, 0);
    const percentage = (total / 800) * 100;

    // 📌 Grade calculation logic
    const getGrade = (mark) => {
        if (mark >= 90) return 'A+';
        if (mark >= 80) return 'A';
        if (mark >= 70) return 'B+';
        if (mark >= 60) return 'B';
        if (mark >= 50) return 'C';
        if (mark >= 35) return 'D';
        return 'F';
    };

    const overallGrade = getGrade(percentage);
    const resultStatus = marks.every(m => m >= 35) ? "Pass" : "Fail";
    const remark = resultStatus === "Pass"
        ? percentage >= 90 ? "🌟 Excellent performance! Keep it up!"
        : percentage >= 70 ? "👍 Good job! Aim higher!"
        : percentage >= 50 ? "🙂 Fair. You can improve more!"
        : "😐 Passed. Focus on weak areas."
        : "❌ Failed. Need more preparation.";

    // 📌 Populate student info
    document.getElementById('card-name').textContent = name;
    document.getElementById('card-class').textContent = cls;
    document.getElementById('card-semester').textContent = sem;
    document.getElementById('card-course').textContent = course;
    document.getElementById('card-usn').textContent = usn;
    document.getElementById('pusn').textContent = usn;
    document.getElementById('card-gender').textContent = gender;

    // 📌 Set photo
    if (photo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('card-photo').src = e.target.result;
        };
        reader.readAsDataURL(photo);
    }

    // 📌 Fill subject-wise marks and grades
    const ids = ['maths', 'physics', 'cprog', 'web', 'eng', 'kannada', 'idt', 'civil'];
    ids.forEach((id, index) => {
        document.getElementById(`mark-${id}`).textContent = marks[index];
        document.getElementById(`grade-${id}`).textContent = getGrade(marks[index]);
    });

    // 📌 Total, percentage, result
    document.getElementById('card-total').textContent = total + " / 800";
    document.getElementById('card-percentage').textContent = percentage.toFixed(2) + " %";
    document.getElementById('card-result').textContent = resultStatus;
    document.getElementById('card-grade').textContent = overallGrade;
    document.getElementById('card-remark').textContent = remark;

    // 📌 Fill readonly total & percentage fields on the form
    const readonlyFields = document.querySelectorAll('.total input');
    readonlyFields[0].value = total;
    readonlyFields[1].value = percentage.toFixed(2);
});

// 🖨️ Print Marks Card
function printMarksCard() {
    var content = document.getElementById('marks-card').innerHTML; // Get the content of the marks card
    var originalContent = document.body.innerHTML; // Store the original content of the page

    document.body.innerHTML = content; // Replace the body with just the marks card content

    window.print(); // Open the print dialog

    document.body.innerHTML = originalContent; // Restore the original page content
  }
