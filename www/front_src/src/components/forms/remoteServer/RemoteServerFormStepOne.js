/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default */

import React, { Component } from 'react';
import { Field, reduxForm as connectForm } from 'redux-form';
import classnames from 'classnames';
import { Translate, I18n } from 'react-redux-i18n';
import styles from '../../../styles/partials/form/_form.scss';
import InputField from '../../form-fields/InputField';
import SelectField from '../../form-fields/SelectField';
import RadioField from '../../form-fields/PreselectedRadioField';
import CheckboxField from '../../form-fields/CheckboxField';

import {
  serverNameValidator,
  serverIpAddressValidator,
  centralIpAddressValidator,
  databaseUserValidator,
  databasePasswordValidator,
  centreonPathValidator,
} from '../../../helpers/validators';

class RemoteServerFormStepOne extends Component {
  state = {
    initialized: false,
    inputTypeManual: true,
  };

  onManualInputChanged(inputTypeManual) {
    this.setState({
      inputTypeManual,
    });
  }

  initializeFromRest = (value) => {
    this.props.change('inputTypeManual', !value);
    this.setState({
      initialized: true,
      inputTypeManual: !value,
    });
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { waitList } = nextProps;
    const { initialized } = this.state;
    if (waitList && !initialized) {
      this.initializeFromRest(waitList.length > 0);
      // this.initializeFromRest(true);//set to true of false if abandon the upper case condition
    }
    this.setState({
      centreon_folder: '/centreon/',
      initialized: true,
    });
  };

  render() {
    const { error, handleSubmit, onSubmit, waitList } = this.props;
    const { inputTypeManual } = this.state;
    return (
      <div className={styles['form-wrapper']}>
        <div className={styles['form-inner']}>
          <div className={styles['form-heading']}>
            <h2 className={classnames(styles['form-title'], styles['mb-2'])}>
              <Translate value="Remote Server Configuration" />
            </h2>
          </div>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Field
              checked={inputTypeManual}
              component={RadioField}
              label={I18n.t('Create new Remote Server')}
              name="inputTypeManual"
              onChange={() => {
                this.onManualInputChanged(true);
              }}
            />
            {inputTypeManual ? (
              <div>
                <Field
                  component={InputField}
                  label={`${I18n.t('Server Name')}:`}
                  name="server_name"
                  placeholder=""
                  type="text"
                />
                <Field
                  component={InputField}
                  label={`${I18n.t('Server IP address')}:`}
                  name="server_ip"
                  placeholder=""
                  type="text"
                />
                <Field
                  component={InputField}
                  label={`${I18n.t('Database username')}:`}
                  name="db_user"
                  placeholder=""
                  type="text"
                />
                <Field
                  component={InputField}
                  label={`${I18n.t('Database password')}:`}
                  name="db_password"
                  placeholder=""
                  type="password"
                />
                <Field
                  component={InputField}
                  label={`${I18n.t(
                    'Centreon Central IP address, as seen by this server',
                  )}:`}
                  name="centreon_central_ip"
                  placeholder=""
                  type="text"
                />
                <Field
                  component={InputField}
                  label={`${I18n.t('Centreon Web Folder on Remote')}:`}
                  name="centreon_folder"
                  placeholder="/centreon/"
                  type="text"
                />
                <Field
                  component={CheckboxField}
                  label={I18n.t('Do not check SSL certificate validation')}
                  name="no_check_certificate"
                />
                <Field
                  component={CheckboxField}
                  label={I18n.t(
                    'Do not use configured proxy to connect to this server',
                  )}
                  name="no_proxy"
                />
              </div>
            ) : null}

            <Field
              checked={!inputTypeManual}
              component={RadioField}
              label={`${I18n.t('Select a Remote Server')}:`}
              name="inputTypeManual"
              onClick={() => {
                this.onManualInputChanged(false);
              }}
            />
            {!inputTypeManual ? (
              <div>
                {waitList ? (
                  <Field
                    required
                    component={SelectField}
                    label={`${I18n.t('Select Pending Remote Links')}:`}
                    name="server_ip"
                    options={[
                      {
                        disabled: true,
                        selected: true,
                        text: I18n.t('Select IP'),
                        value: '',
                      },
                    ].concat(
                      waitList.map((c) => ({ text: c.ip, value: c.id })),
                    )}
                  />
                ) : null}
                <Field
                  component={InputField}
                  label={`${I18n.t('Server Name')}:`}
                  name="server_name"
                  placeholder=""
                  type="text"
                />
                <Field
                  component={InputField}
                  label={`${I18n.t('Database username')}:`}
                  name="db_user"
                  placeholder=""
                  type="text"
                />
                <Field
                  component={InputField}
                  label={`${I18n.t('Database password')}:`}
                  name="db_password"
                  placeholder=""
                  type="password"
                />
                <Field
                  component={InputField}
                  label={`${I18n.t(
                    'Centreon Central IP address, as seen by this server',
                  )}:`}
                  name="centreon_central_ip"
                  placeholder=""
                  type="text"
                />
                <Field
                  component={InputField}
                  label={`${I18n.t('Centreon Web Folder on Remote')}:`}
                  name="centreon_folder"
                  placeholder="/centreon/"
                  type="text"
                />
                <Field
                  component={CheckboxField}
                  label={I18n.t('Do not check SSL certificate validation')}
                  name="no_check_certificate"
                />
                <Field
                  component={CheckboxField}
                  label={I18n.t(
                    'Do not use configured proxy to connect to this server',
                  )}
                  name="no_proxy"
                />
              </div>
            ) : null}

            <div className={styles['form-buttons']}>
              <button className={styles.button} type="submit">
                <Translate value="Next" />
              </button>
            </div>
            {error ? (
              <div className={styles['error-block']}>{error.message}</div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

const validate = ({
  server_name,
  server_ip,
  centreon_central_ip,
  db_user,
  db_password,
  centreon_folder,
}) => ({
  centreon_central_ip: I18n.t(centralIpAddressValidator(centreon_central_ip)),
  centreon_folder: I18n.t(centreonPathValidator(centreon_folder)),
  db_password: I18n.t(databasePasswordValidator(db_password)),
  db_user: I18n.t(databaseUserValidator(db_user)),
  server_ip: I18n.t(serverIpAddressValidator(server_ip)),
  server_name: I18n.t(serverNameValidator(server_name)),
});

export default connectForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  form: 'RemoteServerFormStepOne',
  keepDirtyOnReinitialize: true,
  validate,
  warn: () => {},
})(RemoteServerFormStepOne);
