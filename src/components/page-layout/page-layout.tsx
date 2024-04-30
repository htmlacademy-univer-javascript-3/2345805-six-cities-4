import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import PageBody from '../page-body/page-body';
import Header from '../header/header';
import Footer from '../footer/footer';
import { usePageInfo } from './hooks';
import { ReactNode } from 'react';
import { routeNameToPageInfoMap } from '../../const';

type PageLayoutProps = {
  isPageWrapper?: boolean;
  isHeaderUserNavigation?: boolean;
  isHeaderActiveLogo?: boolean;
  isHeaderShow?: boolean;
  isFooterShow?: boolean;
  wrapperComponent?: React.ComponentType<{ children: ReactNode }>;
  children?: ReactNode;
};

function getPageInfo(pathname: string) {
  return (
    routeNameToPageInfoMap[pathname] || {
      title: '',
      description: '',
    }
  );
}

function PageLayout(props: PageLayoutProps): JSX.Element {
  const {
    wrapperComponent: WrapperComponent = PageBody,
    isPageWrapper = true,
    isHeaderActiveLogo: isActiveLogo = true,
    isHeaderUserNavigation: isUserNavigation = true,
    isHeaderShow = true,
    isFooterShow = false,
    children,
  } = props;

  const { pathname } = useLocation();

  const { pageInfo, setPageInfo } = usePageInfo(getPageInfo(pathname));

  const outletContext = { setPageInfo };

  const layoutContent = (
    <>
      <Helmet>
        <title>Six-cities{pageInfo.title && ` | ${pageInfo.title}`}</title>
        <meta name="description" content={pageInfo.description} />
      </Helmet>
      {isHeaderShow && (
        <Header
          isUserNavigation={isUserNavigation}
          isActiveLogo={isActiveLogo}
        />
      )}
      <Outlet context={outletContext} />
      {children}
      {isFooterShow && <Footer />}
    </>
  );

  return isPageWrapper ? (
    <WrapperComponent>{layoutContent}</WrapperComponent>
  ) : (
    layoutContent
  );
}

export default PageLayout;
