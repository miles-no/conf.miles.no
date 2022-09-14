import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import author from './author';
import conference from './conference';
import submission from './submission';

import portableText from './objects/portableText';
import performance from './objects/performance';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    author,
    conference,
    submission,

    portableText,
    performance,
  ]),
})
