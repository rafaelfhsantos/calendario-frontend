import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const events = [
    { title: "Evento 1", start: "2024-02-22T12:00:00", end: "2024-02-22T15:00:00" },
    { title: "Evento 2", start: "2024-02-25" },
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
};

export default Calendar;
