import React from 'react';
import { View, Image } from 'react-native';
import { Color } from 'mo-app-common';
// import DefaultAvatar from '../../images/svg/default_avatar.svg';

export default class AvatarImage extends React.PureComponent<any, any> {

    static defaultProps = {
        width: 32,
        border: 0,
    };

    constructor(props: any) {
      super(props);
      this.state = { loaded: false };
    }

    fixAvatar = (avatar = '') => {
        if (avatar) {
            return avatar.replace('http://', 'https://');
        }
        return avatar;
    }

    render() {
        const { avatar, width, style, border, containerStyle } = this.props;
        const borderStyle = border > 0 ? {borderWidth: border, borderColor: Color.primary, borderRadius: width / 2 + border, width: width + border*2, height: width + border*2} : {};
        const hasBorder = border > 0 ? true : false;
        if (avatar) {
            const fix_avatar = this.fixAvatar(avatar);
            if (hasBorder) {
                return (
                    <View style={[borderStyle, containerStyle]}>
                        <Image
                            style={[{width: width, height: width, borderRadius: width / 2}, style]}
                            source={{uri: fix_avatar}}
                        />
                    </View>
                );
            }

            return (
                <Image
                    style={[{width: width, height: width, borderRadius: width / 2}, style, containerStyle ]}
                    source={{uri: fix_avatar}}
                />
            );
        }
        return <View />
        // if (hasBorder) {
        //     return (
        //         <View style={[borderStyle, containerStyle]}>
        //             <DefaultAvatar width={width} height={width}  />
        //         </View>
        //     );
        // }
        // return (<DefaultAvatar width={width} height={width} />);
    }
}
