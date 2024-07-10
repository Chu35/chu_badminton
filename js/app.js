document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const jobForm = document.getElementById('add-job-form');
    const statsBody = document.getElementById('stats-body');
    const monthYearDisplay = document.getElementById('month-year-display');

    let currentYear, currentMonth;

    // 初始化當前月份的行事曆和統計
    function initCalendar(year, month) {
        currentYear = year;
        currentMonth = month;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // 更新月份顯示
        monthYearDisplay.textContent = `${year} 年 ${month + 1} 月`;

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
            cell.classList.add('calendar-day');
            cell.addEventListener('click', () => selectDate(year, month, i, cell));
            calendar.appendChild(cell);
        }

        // 清空當月統計
        statsBody.innerHTML = '';

        // 重新計算並顯示當月統計
        calculateMonthlyStats(year, month);
    }

    // 選擇日期
    function selectDate(year, month, day, cell) {
        const selectedDate = new Date(year, month, day);
        jobForm.dataset.date = selectedDate.toISOString();

        // 更新選中日期的相關信息顯示
        document.getElementById('selected-date-info').textContent = `${year}-${month + 1}-${day}`;

        // 更改選中日期的樣式
        const selectedCells = document.querySelectorAll('.calendar-day.selected');
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        cell.classList.add('selected');
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
        const dayCell = calendar.querySelector(`.calendar-day.selected`);
        if (dayCell) {
            dayCell.style.backgroundColor = '#e0f7fa';
            dayCell.title = `${job.name}: ${hours.toFixed(2)} 小時, ${wage.toFixed(2)} 元`;
        }

        // 更新統計
        calculateMonthlyStats(currentYear, currentMonth);
    }

    // 計算並更新當月統計
    function calculateMonthlyStats(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDateString = firstDay.toISOString().split('T')[0];
        const endDateString = lastDay.toISOString().split('T')[0];

        let totalHours = 0;
        let totalWage = 0;

        // 遍歷統計表格，計算總工時和總薪資
        const rows = statsBody.querySelectorAll('tr');
        rows.forEach(row => {
            const rowDate = new Date(row.dataset.date);
            if (rowDate >= firstDay && rowDate <= lastDay) {
                const hoursCell = row.querySelector('td:nth-child(2)');
                const wageCell = row.querySelector('td:nth-child(3)');
                totalHours += parseFloat(hoursCell.textContent);
                totalWage += parseFloat(wageCell.textContent);
            }
        });

        // 更新統計表格顯示
        const statsRow = document.createElement('tr');
        statsRow.dataset.date = lastDay.toISOString().split('T')[0];
        statsRow.innerHTML = `<td>${year}-${month + 1}-${lastDay.getDate()}</td><td>${totalHours.toFixed(2)}</td><td>${totalWage.toFixed(2)}</td>`;
        statsBody.appendChild(statsRow);
    }

    // 切換到上一個月份
    document.getElementById('prev-month-btn').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        initCalendar(currentYear, currentMonth);
    });

    // 切換到下一個月份
    document.getElementById('next-month-btn').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        initCalendar(currentYear, currentMonth);
    });

    // 初始化當前月份的行事曆和統計
    const today = new Date();
    initCalendar(today.getFullYear(), today.getMonth());
});
