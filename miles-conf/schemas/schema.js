import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import siteSettings from './siteSettings';
import author from './author';
import conference from './conference';
import submission from './submission';

import portableText from './objects/portableText';
import performance from './objects/performance';
import urls from './objects/urls';
import itinerary from './objects/itinerary';
import itineraryEvent from './objects/itineraryEvent';
import externalConference from './externalConference';
import event from './event';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    siteSettings,

    author,
    conference,
    externalConference,
    event,
    submission,

    portableText,
    performance,
    urls,
    itinerary,
    itineraryEvent
  ]),
})
