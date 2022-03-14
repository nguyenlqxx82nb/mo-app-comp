import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Color, Constants, pushModal} from 'mo-app-common';
import Slide from './Slide';
import AsyncImage from '../AsyncImage';
import ZoomImageViewer from './ZoomImageViewer';

export default class SlideShow extends PureComponent<any, any> {
    slideshowModal : any;
    static defaultProps = {
        containerStyle: {},
        images: [],
        width: Constants.Width,
        height: Constants.Width * 9 / 16
    }

    constructor(props: any) {
        super(props);
    }

    componentDidMount() { }

    showZoomSlideImages = (items: Array<string>, index: number) => {
        const modal = {
            content: <ZoomImageViewer
                        ref={comp => (this.slideshowModal = comp)}
                        autoOpen={true}
                        images={items}
                        index={index}
                    />
        };
        pushModal(modal);
        // let sharedElements: SharedElementsConfig = [];
        // sharedElements = [`photo.${item.id}`];
        // Router.push(
        //     <PagerScreen
        //         index={index}
        //         item={item}
        //         items={items} />,
        //     {
        //         sharedElements: sharedElements,
        //         transitionConfig: fadeIn(0, true),
        //     }
        // );
    }

    render() {
        const { containerStyle, width, height, images } = this.props;
        // const items = images.map( (item: any, index: number) => {
        //     return {
        //         id: index,
        //         url: item,
        //         props: {},
        //         freeHeight: true
        //     };
        // });
        return (
            <View style={[{width: width, height: height}, containerStyle]}>
                {
                    images.length > 0 &&
                    <Slide
                        showsButtons={false}
                        dotColor={Color.gray}
                        activeDotColor={Color.dark}
                        removeClippedSubviews={false}
                        paginationStyle={{bottom: 15}}>
                            {
                                images.map((item: any, index: number) => {
                                    return (
                                        <TouchableOpacity
                                            key={`${index}`}
                                            activeOpacity={0.99}
                                            onPress={this.showZoomSlideImages.bind(this, images, index)}>
                                            <AsyncImage source={{uri: item}} style={{width: width, height: height }} />
                                            {/* <SharedElement
                                                id={`photo.${item.id}`}
                                                style={{width: width, height: height }}>
                                                <AsyncImage source={{uri: item.url}} style={{width: width, height: height }} />
                                            </SharedElement> */}
                                        </TouchableOpacity>
                                    );
                                })
                            }
                    </Slide>
                }
            </View>
        );
    }
}


