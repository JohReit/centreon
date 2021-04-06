import * as React from 'react';

import clsx from 'clsx';

import { Typography, makeStyles, useTheme, fade } from '@material-ui/core';

import { Line } from './models';

const useStyles = makeStyles((theme) => ({
  caption: {
    color: fade(theme.palette.common.black, 0.6),
    marginRight: theme.spacing(1),
  },
  hidden: {
    color: theme.palette.text.disabled,
  },
  icon: {
    borderRadius: '50%',
    height: 9,
    marginRight: theme.spacing(1),
    width: 9,
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(0, 1, 1, 0),
  },
  toggable: {
    '&:hover': {
      color: theme.palette.common.black,
    },
    cursor: 'pointer',
  },
}));

interface Props {
  lines: Array<Line>;
  onClearItemHighlight: () => void;
  onItemHighlight: (metric) => void;
  onItemToggle: (params) => void;
  toggable: boolean;
}

const Legend = ({
  lines,
  onItemToggle,
  toggable,
  onItemHighlight,
  onClearItemHighlight,
}: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const getLegendName = ({ metric, name, display }: Line): JSX.Element => {
    return (
      <div
        onMouseEnter={(): void => onItemHighlight(metric)}
        onMouseLeave={(): void => onClearItemHighlight()}
      >
        <Typography
          className={clsx(
            {
              [classes.hidden]: !display,
              [classes.toggable]: toggable,
            },
            classes.caption,
          )}
          variant="body2"
          onClick={(): void => {
            if (!toggable) {
              return;
            }
            onItemToggle(metric);
          }}
        >
          {name}
        </Typography>
      </div>
    );
  };

  return (
    <>
      {lines.map((line) => {
        const { color, name, display } = line;

        const iconBackgroundColor = display
          ? color
          : fade(theme.palette.text.disabled, 0.2);

        return (
          <div className={classes.item} key={name}>
            <div
              className={clsx(classes.icon, { [classes.hidden]: !display })}
              style={{ backgroundColor: iconBackgroundColor }}
            />
            {getLegendName(line)}
          </div>
        );
      })}
    </>
  );
};

export default Legend;
