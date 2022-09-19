        days_arr = ['','Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        hours_arr = ['','08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm', '08:00 pm','09:00 pm', '10:00 pm', '11:00 pm'];
        const calendar_div = document.querySelector('.calendar');
        const header_date = document.querySelector('.calendar_head .date');

        function initLoad(){
            for (var c = 0; c <days_arr.length; c++) {
                createMainRows(days_arr[c], c, 0)
                for (var r = 1; r <hours_arr.length; r++) {
                    createMainRows(hours_arr[r], c, r);
                }
            }
        }

        function createMainRows(data, c, r){
            const dayNameDiv = document.createElement('div');
            c === 0? dayNameDiv.classList.add(`dayName`, `row${r+1}`, `col${c+1}`) : dayNameDiv.classList.add(`cell`,`hour`, `row${r+1}`, `col${c+1}`);
            r === 0 && dayNameDiv.classList.add('head');
            const dayNameSpan = document.createElement('Span');
            r === 0 ? dayNameSpan.textContent = data.substr(0,3) : dayNameSpan.textContent = data;
            dayNameDiv.appendChild(dayNameSpan);
            calendar_div.appendChild(dayNameDiv);
        }

        function init(date){
            header_date.textContent = `${date.toLocaleString("default", {month: "long"})} ${date.getFullYear()}`;
            // console.log(date);
            mapDayNumMon(date);
            fillDateTimeCells(date);
        }

        function mapDayNumMon(date){
            const temp_date_week = date;
            const head_elems = document.querySelectorAll('.head');
            const current_day = temp_date_week.toLocaleString("default", {weekday: "long"});
            let curr_day_index = days_arr.indexOf(current_day) - 1;
            temp_date_week.setDate(temp_date_week.getDate() - curr_day_index);
            console.log(curr_day_index);
            for(i=1; i<head_elems.length; i++){
                head_elems[i].classList.add(`${temp_date_week.getDate()}`);
                let day_num_span = document.createElement('span');
                day_num_span.classList.add('dayNumber');
                head_elems[i].querySelector('.dayNumber') &&
                    head_elems[i].removeChild(head_elems[i].querySelector('.dayNumber'));
                day_num_span.textContent = `${temp_date_week.getDate()}`;
                head_elems[i].appendChild(day_num_span);
                console.log(temp_date_week.toDateString());
                let todayDate = new Date;
                // console.log(temp_date_week.toDateString() == todayDate.toDateString());
                head_elems[i].dataset.dateTime = temp_date_week.toDateString();
                (temp_date_week.toDateString() == todayDate.toDateString())?
                    head_elems[i].classList.add('font-bold', 'text-indigo-600', 'shadow-md')
                    : head_elems[i].classList.remove('font-bold', 'text-indigo-600', 'shadow-md');
                temp_date_week.setDate(temp_date_week.getDate() + 1);
            }
        }

        function fillDateTimeCells(date){
            const cells = document.querySelectorAll('.cell');
            let temp_date = date;
            let index = 1;
            [...cells].map(cell => {
                if(cell.classList.contains('head'))
                    temp_date = cell.dataset.dateTime;
                else
                    if(index<hours_arr.length){
                        // console.log(cell);
                        cell.dataset.dateTime = `${temp_date} ${hours_arr[index]}`;
                        index++;}
                    else{
                        index = 1;
                        cell.dataset.dateTime = `${temp_date} ${hours_arr[index]}`;
                        index++;
                    }
            })
        }

        function setDateEvent(nav_month, nav_week){
            const date = new Date();
            date.setMonth(date.getMonth() + nav_month);
            date.setDate(date.getDate() + nav_week);
            init(date);
        }

        initLoad();
        init(new Date());
        var nav_month = 0;
        var nav_week  = 0;

        document.addEventListener('click', (e) => {
            let elem = e.target;
            if(checkParents(e.target, 'action_date')) elem = checkParents(e.target, 'action_date');
            if(elem.dataset.type === 'nextMonth'){
                nav_month++;
                setDateEvent(nav_month, nav_week);
            }
            if(elem.dataset.type === 'prevMonth'){
                nav_month--;
                setDateEvent(nav_month, nav_week);
            }
            if(elem.dataset.type === 'nextWeek'){
                nav_week += 7;
                setDateEvent(nav_month, nav_week);
            }
            if(elem.dataset.type === 'prevWeek'){
                nav_week -= 7;
                setDateEvent(nav_month, nav_week);
            }
            if(elem.classList.contains('close_calendar'))
                document.querySelector('#calendar-overlay').classList.toggle('hidden');
        })

        const check_in_input = document.querySelector('.modal #checkIn');
        const check_out_input = document.querySelector('.modal #checkOut');

        function hendlePickTime(cell){
            console.log(cell.dataset.dateTime);
            if(check_in_input.value != '' && check_out_input.value != '')
                resetValues();
            else{
                if(check_in_input.value == ''){
                    let curr_date = new Date;
                    // console.log(new Date(cell.dataset.dateTime).toLocaleString() < curr_date.toLocaleString());
                    if(new Date(cell.dataset.dateTime) < curr_date)
                        document.querySelector('.error_message').innerText = `Not valid date`;
                    else{
                        document.querySelector('.error_message').innerText = '';
                        check_in_input.value = cell.dataset.dateTime;}
                }else if(new Date(cell.dataset.dateTime) > new Date(check_in_input.value)){
                    check_out_input.value = cell.dataset.dateTime;
                }else
                    document.querySelector('.error_message').innerText = `Not valid date`;
            }
        }
        // console.log(new Date('Sun Dec 26 2021 10:00 am') < new Date('Mon Dec 27 2021 11:00 am'));
        function resetValues(){
            check_in_input.value = '';
            check_out_input.value = '';
        }

        const cells_btn = document.querySelectorAll('.cell:not(.head)');
        [...cells_btn].map(cell => {
            cell.addEventListener('click', (e)=> {hendlePickTime(cell)});
        })

        function resetCalendarForm(){
            const calendar_inputs = document.querySelectorAll('.calendar_form form input'); 
            [...calendar_inputs].map(input => {input.value = '';});
            document.querySelector('.error_message').innerText = '';
        };