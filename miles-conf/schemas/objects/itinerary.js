import { format } from 'date-fns';

const getDaysArray = (start, end) => {
  const arr = [];
  for (const dt = new Date(start);  dt <= new Date(end); dt.setDate(dt.getDate()+1)){
    arr.push(format(new Date(dt), 'yyyy-MM-dd'));
  }
  return arr;
};

export default {
  name: 'itinerary',
  type: 'object',
  title: 'Itinerary',
  fields: [
    {
      title: 'Date',
      name: 'itineraryDate',
      type: 'date',
      validation: Rule => Rule.custom((date, context) => {
        const validDays = getDaysArray(context.document.startDate, context.document.endDate);
        if (!validDays.includes(date)) {
          return `The date must be one of the following: ${validDays.join(', ')}`;
        }
        const existingItineraries = context.document.itinerary
          .filter(i => i.itineraryDate && i._key != context.parent._key)
          .map(i => i.itineraryDate);

        if (existingItineraries.includes(date)) {
          return 'An itinerary already exists for this day';
        }
        return true;
      })
    },
    {
      title: 'Events',
      name: 'events',
      type: 'array',
      of: [{
        type: 'itineraryEvent'
      }],
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'itineraryDate',
    },
  }
}