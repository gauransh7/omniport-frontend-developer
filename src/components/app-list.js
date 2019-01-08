import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Card, Label } from 'semantic-ui-react'

import { TileCard } from 'formula_one'
import { setAppList } from '../actions'

import main from '../css/app-list.css'

class AppList extends React.PureComponent {
  componentDidMount () {
    this.props.SetAppList()
  }
  render () {
    const { appList } = this.props
    return (
      <Container>
        {appList.isLoaded ? (
          <div styleName='app-list-container'>
            <Card.Group stackable doubling itemsPerRow={3}>
              <TileCard name='Add' iconName='add' desc='Add a new app' />
              {appList.data.map(app => {
                return (
                  <TileCard
                    as={Link}
                    to={`./${app.id}`}
                    key={app.id}
                    name={app.name}
                    desc={
                      app.isApproved ? (
                        <span>
                          Approved
                          <Label circular color='green' empty />
                        </span>
                      ) : (
                        <span>
                          Not approved
                          <Label circular color='red' empty />
                        </span>
                      )
                    }
                    imageUrl={app.logo}
                    iconName='cube'
                  />
                )
              })}
            </Card.Group>
          </div>
        ) : (
          'Loading'
        )}
      </Container>
    )
  }
}

function mapStateToProps (state) {
  return {
    appList: state.appList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SetAppList: () => {
      dispatch(setAppList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppList)