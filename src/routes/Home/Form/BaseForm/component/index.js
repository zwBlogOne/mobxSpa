import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';

import Spinner from 'components/Spinner/Spinner'; // eslint-disable-line
import ModuleLine from 'components/ModuleLine'; // eslint-disable-line
import { WithBreadcrumb } from 'components/Breadcrumb'; // eslint-disable-line

import BForm from './BForm';

import './style.scss';

@inject('CreatePromotionStore')
@observer
class BaseForm extends Component {
  static propTypes = {
    CreatePromotionStore: PropTypes.object.isRequired,
    routerData: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { CreatePromotionStore } = this.props;
    CreatePromotionStore.initialData();
  }

  handleSubmit = (values) => {
    const {
      area: AREA,
      className,
      englishPress,
      englishTeacher,
      grade,
      mathPress,
      mathTeacher,
      school,
    } = values;

    const { CreatePromotionStore, history: { replace } } = this.props;
    CreatePromotionStore.CreatePromotion({
      province: AREA[0] || '',
      city: AREA[1] || '',
      area: AREA[2] || '',
      className,
      englishPress,
      englishTeacher,
      grade,
      mathPress,
      mathTeacher,
      school,
    }, (id) => {
      replace(`/detail/baseDetail/${id}`);
    });
  };

  render() {
    const { routerData, CreatePromotionStore } = this.props;
    const { config } = routerData;

    const {
      regions, mathType, englishType, loading,
    } = CreatePromotionStore;

    return (
      <WithBreadcrumb config={config}>
        <div className="createPromotion-container">
          <Helmet>
            <title>基础表单 - SPA</title>
            <meta name="description" content="SPA" />
          </Helmet>
          <ModuleLine title="新增推广" />

          {loading ? (
            <Spinner />
          ) : (
            <BForm
              regions={regions}
              mathType={mathType}
              englishType={englishType}
              onSubmit={this.handleSubmit}
            />
          )}
        </div>
      </WithBreadcrumb>
    );
  }
}

export default BaseForm;
