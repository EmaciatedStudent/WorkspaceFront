import {
    addDays,
    eachMinuteOfInterval,
    endOfMonth,
    endOfWeek,
    isBefore,
    isSameDay,
    startOfMonth,
    startOfWeek
} from "date-fns";

const DateService = () => {
    const weekConfig = {weekStartsOn: 1};

    const getDatePeriod = (start, end) => {
        let currentDay = start;
        const result = [];

        do {
            result.push(currentDay);
            currentDay = addDays(currentDay, 1);
        } while (isSameDay(currentDay, end) || isBefore(currentDay, end));

        return result;
    }

    const getWeekDays = (day) => getDatePeriod(startOfWeek(day, weekConfig), endOfWeek(day, weekConfig))
        .map(day => day.toLocaleString("ru", {
            month: 'numeric',
            day: 'numeric',
            weekday: 'short'
        }));

    const getWeekDates = (day) => getDatePeriod(startOfWeek(day, weekConfig), endOfWeek(day, weekConfig))
        .map(day => day.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }));

    const formatDate = (date) => date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const getMonthDaysWithAdditionalDays = (day) => getDatePeriod(
        startOfWeek(startOfMonth(day), weekConfig),
        endOfWeek(endOfMonth(day), weekConfig))
        .map(day => day.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }));

    const timeOptions = {
        hour: "numeric",
        minute: "numeric"
    }
    const formatTime = time => time.toLocaleString("ru", timeOptions);

    const getTimeIntervals = (day) => {
        let day_start = day.setHours(8, 0, 0, 0);
        let day_end = day.setHours(20, 30, 0, 0);

        let result = eachMinuteOfInterval({
            start: day_start,
            end: day_end
        }, {step: 30})
            .map(time => formatTime(time))
            .map((time, key) => {

            });

        return result;
    }

    return {getWeekDays, getWeekDates, getMonthDaysWithAdditionalDays, getTimeIntervals, formatDate}
}

export default DateService;