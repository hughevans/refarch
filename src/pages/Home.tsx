import {
  ActionList,
  AppProvider,
  Card,
  ContextualSaveBar,
  FormLayout,
  Frame,
  Layout,
  Loading,
  Modal,
  Navigation,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TextField,
  Toast,
  TopBar
} from "@shopify/polaris";
import React from "react";
// import { Link } from "react-router-dom";

interface IState {
  emailFieldValue: string;
  isDirty: boolean;
  isLoading: boolean;
  modalActive: boolean;
  nameFieldValue: string;
  searchActive: boolean;
  searchText: string;
  showMobileNavigation: boolean;
  showToast: boolean;
  storeName: string;
  supportMessage: string;
  supportSubject: string;
  userMenuOpen: boolean;
}

enum ToggleableState {
  isDirty,
  isLoading,
  modalActive,
  searchActive,
  showMobileNavigation,
  showToast,
  userMenuOpen
}

class Home extends React.Component<{}, IState> {
  public readonly defaultState = {
    emailFieldValue: "foo@example.com",
    nameFieldValue: "Foo Bar"
  };

  public state: Readonly<IState> = {
    emailFieldValue: this.defaultState.emailFieldValue,
    isDirty: false,
    isLoading: false,
    modalActive: false,
    nameFieldValue: this.defaultState.nameFieldValue,
    searchActive: false,
    searchText: "",
    showMobileNavigation: false,
    showToast: false,
    storeName: this.defaultState.nameFieldValue,
    supportMessage: "",
    supportSubject: "",
    userMenuOpen: false
  };

  public render() {
    const {
      showToast,
      isLoading,
      isDirty,
      searchActive,
      searchText,
      userMenuOpen,
      showMobileNavigation,
      nameFieldValue,
      emailFieldValue,
      modalActive,
      storeName
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState(ToggleableState.showToast)}
        content="Changes saved"
      />
    ) : null;

    const userMenuActions = [
      {
        id: "one",
        items: [{ content: "Back to Shopify", icon: "arrowLeft" }]
      },
      {
        id: "two",
        items: [{ content: "Community forums" }]
      }
    ];

    const navigationUserMenuMarkup = (
      <Navigation.UserMenu
        actions={userMenuActions}
        name="Dharma"
        detail={storeName}
        avatarInitials="D"
      />
    );

    const contextualSaveBarMarkup = isDirty ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          onAction: this.handleSave
        }}
        discardAction={{
          onAction: this.handleDiscard
        }}
      />
    ) : null;

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={userMenuActions}
        name="Dharma"
        detail={storeName}
        initials="D"
        open={userMenuOpen}
        onToggle={this.toggleState(ToggleableState.userMenuOpen)}
      />
    );

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            { content: "Shopify help center" },
            { content: "Community forums" }
          ]}
        />
      </Card>
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={this.handleSearchFieldChange}
        value={searchText}
        placeholder="Search"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
        onNavigationToggle={this.toggleState(
          ToggleableState.showMobileNavigation
        )}
      />
    );

    const navigationMarkup = (
      <Navigation location="/" userMenu={navigationUserMenuMarkup}>
        <Navigation.Section
          title="Settings"
          items={[
            {
              icon: "home",
              label: "Account",
              onClick: this.toggleState(ToggleableState.isLoading)
            },
            {
              icon: "orders",
              label: "Orders",
              onClick: this.toggleState(ToggleableState.isLoading)
            }
          ]}
        />
        <Navigation.Section
          title="Support"
          items={[
            {
              icon: "help",
              label: "Help center",
              onClick: this.toggleState(ToggleableState.isLoading)
            }
          ]}
          separator={true}
          action={{
            accessibilityLabel: "Contact support",
            icon: "conversation",
            onClick: this.toggleState(ToggleableState.modalActive)
          }}
        />
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Account">
        <Layout>
          <Layout.AnnotatedSection
            title="Billing details"
            description="We will use this as your billing information."
          >
            <Card sectioned={true}>
              <FormLayout>
                <TextField
                  label="Full name"
                  value={nameFieldValue}
                  onChange={this.handleNameFieldChange}
                />
                <TextField
                  type="email"
                  label="Email"
                  value={emailFieldValue}
                  onChange={this.handleEmailFieldChange}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned={true}>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={9} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState(ToggleableState.modalActive)}
        title="Contact support"
        primaryAction={{
          content: "Send",
          onAction: this.toggleState(ToggleableState.modalActive)
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={this.state.supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label="Message"
              value={this.state.supportMessage}
              onChange={this.handleMessageChange}
              multiline={true}
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );

    const theme = {
      colors: {
        topBar: {
          background: "#357997"
        }
      },
      logo: {
        accessibilityLabel: "Jaded Pixel",
        contextualSaveBarSource:
          "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999",
        topBarSource:
          "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999",
        url: "http://jadedpixel.com",
        width: 124
      }
    };

    return (
      <div style={{ height: "500px" }}>
        <AppProvider theme={theme}>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState(
              ToggleableState.showMobileNavigation
            )}
          >
            {contextualSaveBarMarkup}
            {loadingMarkup}
            {pageMarkup}
            {toastMarkup}
            {modalMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }
  public toggleState = (key: ToggleableState) => {
    return () => {
      // Compiler didn't like this:
      // this.setState(prevState => ({ [key]: !prevState[key] }));

      const state = this.state;
      state[key] = !state[key];
      this.setState(state);
    };
  };

  public handleSearchFieldChange = (value: string) => {
    this.setState({ searchText: value });

    if (value.length > 0) {
      this.setState({ searchActive: true });
    } else {
      this.setState({ searchActive: false });
    }
  };

  public handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: ""
      };
    });
  };

  public handleEmailFieldChange = (emailFieldValue: string) => {
    this.setState({ emailFieldValue });

    if (emailFieldValue !== "") {
      this.setState({ isDirty: true });
    }
  };

  public handleNameFieldChange = (nameFieldValue: string) => {
    this.setState({ nameFieldValue });

    if (nameFieldValue !== "") {
      this.setState({ isDirty: true });
    }
  };

  public handleSave = () => {
    this.defaultState.nameFieldValue = this.state.nameFieldValue;
    this.defaultState.emailFieldValue = this.state.emailFieldValue;
    this.setState({
      isDirty: false,
      showToast: true,
      storeName: this.defaultState.nameFieldValue
    });
  };

  public handleDiscard = () => {
    this.setState({
      emailFieldValue: this.defaultState.emailFieldValue,
      isDirty: false,
      nameFieldValue: this.defaultState.nameFieldValue
    });
  };

  public handleSubjectChange = (supportSubject: string) => {
    this.setState({ supportSubject });
  };

  public handleMessageChange = (supportMessage: string) => {
    this.setState({ supportMessage });
  };
}

export default Home;
