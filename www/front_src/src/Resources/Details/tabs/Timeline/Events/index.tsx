import * as React from 'react';

import {
  reduceBy,
  pipe,
  prop,
  toPairs,
  sortWith,
  descend,
  head,
  equals,
  last,
} from 'ramda';

import { Typography, Paper, makeStyles } from '@material-ui/core';

import { useIntersectionObserver } from '@centreon/ui';

import { getFormattedDate } from '../../../../dateTime';
import { TimelineEvent } from '../models';
import { TimelineEventByType } from '../Event';

const useStyles = makeStyles((theme) => ({
  events: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridGap: theme.spacing(1),
    width: '100%',
  },
}));

type DateEvents = Array<[string, Array<TimelineEvent>]>;

interface Props {
  limit: number;
  loading: boolean;
  onLoadMore: () => void;
  page: number;
  timeline: Array<TimelineEvent>;
  total: number;
}

const Events = ({
  timeline,
  total,
  limit,
  page,
  loading,
  onLoadMore,
}: Props): JSX.Element => {
  const classes = useStyles();

  const maxPage = Math.ceil(total / limit);

  const eventsByDate = pipe(
    reduceBy<TimelineEvent, Array<TimelineEvent>>(
      (acc, event) => acc.concat(event),
      [],
      pipe(prop('date'), getFormattedDate),
    ),
    toPairs,
    sortWith([descend(pipe(head, Date.parse))]),
  )(timeline) as DateEvents;

  const dates = eventsByDate.map(head);

  const infiniteScrollTriggerRef = useIntersectionObserver({
    action: onLoadMore,
    loading,
    maxPage,
    page,
  });

  return (
    <div>
      {eventsByDate.map(
        ([date, events]): JSX.Element => {
          const isLastDate = equals(last(dates), date);

          return (
            <div key={date}>
              <div className={classes.events}>
                <Typography variant="h6">{date}</Typography>

                {events.map((event) => {
                  const { id, type } = event;

                  const Event = TimelineEventByType[type];

                  return (
                    <Paper key={`${id}-${type}`}>
                      <Event event={event} />
                    </Paper>
                  );
                })}
              </div>
              {isLastDate && <div ref={infiniteScrollTriggerRef} />}
            </div>
          );
        },
      )}
    </div>
  );
};

export default Events;
