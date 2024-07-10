document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const jobForm = document.getElementById('add-job-form');
    const statsBody = document.getElementById('stats-body');

    // 初始化行事曆
    function initCalendar() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // 清空行事曆
        calendar.innerHTML = '';

        // 填充行事曆
        for (let i = 0; i < firstDay; i++) {
            const cell = document.createElement('div');
            calendar.appendChild(cell);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const cell = document.createElement('div');
            cell.textContent = i;
            cell.addEventListener('click', () => selectDate(year, month, i));
            calendar.appendChild(cell);
        }
    }

    // 選擇日期
    function selectDate(year, month, day) {
        const selectedDate = new Date(year, month, day);
        jobForm.dataset.date = selectedDate.toISOString();
    }

    // 添加工作
    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(jobForm);
        const job = {
            name: formData.get('job-name'),
            startTime: formData.get('start-time'),
            endTime: formData.get('end-time'),
            hourlyWage: parseFloat(formData.get('hourly-wage')),
            date: new Date(jobForm.dataset.date)
        };
        addJob(job);
        jobForm.reset();
    });

    // 添加工作到行事曆和統計
    function addJob(job) {
        const start = new Date(`${job.date.toDateString()} ${job.startTime}`);
        const end = new Date(`${job.date.toDateString()} ${job.endTime}`);
        const hours = (end - start) / 3600000;
        const wage = hours * job.hourlyWage;

        // 更新行事曆
        const dayCell = calendar.querySelector(`div:nth-child(${job.date.getDate() + new Date(job.date.getFullYear(), job.date.getMonth(), 1).getDay()})`);
        dayCell.style.backgroundColor = '#e0f7fa';
        dayCell.title = `${job.name}: ${hours} 小時, ${wage} 元`;

        // 更新統計
        let row = statsBody.querySelector(`tr[data-date="${job.date.toISOString().split('T')[0]}"]`);
        if (!row) {
            row = document.createElement('tr');
            row.dataset.date = job.date.toISOString().split('T')[0];
            row.innerHTML = `<td>${job.date.toISOString().split('T')[0]}</td><td>${hours}</td><td>${wage}</td>`;
            statsBody.appendChild(row);
        } else {
            const hoursCell = row.querySelector('td:nth-child(2)');
            const wageCell = row.querySelector('td:nth-child(3)');
            hoursCell.textContent = parseFloat(hoursCell.textContent) + hours;
            wageCell.textContent = parseFloat(wageCell.textContent) + wage;
        }
    }

    initCalendar();
});
