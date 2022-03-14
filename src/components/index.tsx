// Keyboard
import { KeyboardScrollView } from './Keyboard/KeyboardScrollView';
// input
export * from './Input';
export * from './Text';
export * from './Button';
export * from './Modal';
// Toast
import Toast from './Toast';
// Spinner
import Spinner from './Spinner';
// Indicator
// import Indicator from './Indicator';
export * from './Indicator';
// WebView
// import WebView from './WebView';

// ListView
import ListView from './ListView';
// import LargeListView from './ListView/largeList';
// Radio
import Radio, { IRadioItem } from './Radio';
// Checkbox
import Checkbox, {ICheckBoxItem} from './Checkbox';
// Tab
export * from './Tab';

// Rating
// import Rating from './Rating';
// ZoomImageViewer
import ZoomImageViewer from './SlideShow/ZoomImageViewer';
// Read more
// import ReadMore from './ReadMore';
// Comment
// import CommentItem from './Comment';
// SlideShow
import SlideShow from './SlideShow';
import Slide from './SlideShow/Slide';
// Html render
// import HTMLRender from './HtmlRender';
// ViewMoreHtml
import ViewMoreHTML from './ViewMoreHTML';
// WrapModal
//import WrapModal from './Modal/WrapModal';
// Notification modal'
// import NotificationModal from './Modal/Notification';
// import ListModal from './Modal/List';
// import CccdModal from './Modal/Cccd';

// DatePicker
import DatePicker from './Datepicker';

// Push Notification
// import AndroidPushNotification from './PushNotification/index.android';
// import IOSPushNotification from './PushNotification/push';

//import RadioModal from './Modal/Radio';

//import WrapGradient from './Gradient';

export * from './Router';

//export * from './Card';

import WrapHTMLRender from './Html';

import ModalContainer from './Modal/Container';

//export * from './Filter';
import AsyncImage from './AsyncImage';
import AvatarImage from './Avatar';

import { DismissKeyboard } from './Keyboard/Dismiss';

// import IconSvg from './IconSvg';

// import ContactsEdit from './Input/Contacts';
// import ContactsModal from './Modal/Contacts';

import Dropdown from './Dropdown';
export * from './ImagePicker';
import Tooltip from './Tooltip';
import Notification from './Notification';
import VideoPlayer from './VideoPlayer';
import SafeView from './SafeView';

export {
	DismissKeyboard,
	KeyboardScrollView,
	Toast,
	Spinner,
	ListView,
	// Header,
	Radio,
	IRadioItem,
	Checkbox,
	// Dropdown,
	// Modal,
	ZoomImageViewer,
	SlideShow,
	// HTMLRender,
	ViewMoreHTML,
	DatePicker,
	// LargeListView,
	// AndroidPushNotification,
	// IOSPushNotification,
	WrapHTMLRender,
	ModalContainer,
	Slide,
	AsyncImage,
	AvatarImage,
	// IconSvg,
	Dropdown,
	Tooltip,
	Notification,
	VideoPlayer,
	ICheckBoxItem,
	SafeView
};
