import * as React from 'react';

import { makeStyles } from '@material-ui/core';

import { ResourceLinks } from '../../../models';
import ShortcutsSection from './ShortcutsSection';
import hasDefinedValues from '../../../hasDefinedValues';
import { labelHost, labelService } from '../../../translatedLabels';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: 'grid',
      gridGap: theme.spacing(1),
    },
  };
});

interface Props {
  links: ResourceLinks;
}

const ShortcutsTab = ({ links }: Props): JSX.Element => {
  const classes = useStyles();

  const { uris } = links;
  const { resource: resourceUris } = uris;
  const { parent: parentUris } = uris;

  const isService = hasDefinedValues(parentUris);

  return (
    <div className={classes.container}>
      <ShortcutsSection
        title={isService ? labelService : labelHost}
        uris={resourceUris}
      />
      {isService && <ShortcutsSection title={labelHost} uris={parentUris} />}
    </div>
  );
};

export default ShortcutsTab;