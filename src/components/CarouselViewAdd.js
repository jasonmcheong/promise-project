import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

class CarouselViewAdd extends React.Component {
    state = {
        index: 0,
        userInputAdditional: [],
    };

    handleSelect(selectedIndex) {
        this.setState({
            index: selectedIndex,
        });
    }

    render() {
        const { index } = this.state;
        return (
            <Carousel
                activeIndex={index}
                controls={false}
                fade={true}
                indicators={false}
                interval={null}
                keyboard={false}
                onSelect={this.handleSelect}
                slide={false}
                wrap={false}
            >
                questions <div />
                questions
            </Carousel>
        );
    }
}

export default CarouselViewAdd;
