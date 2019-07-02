import React from 'react';
import { setLanguage } from '../utility/Language';

class OtherLanguages extends React.Component {
    render() {
        // Filtering for the rest of the languages
        const filter = this.props.languages.filter(language => language.acf.top_language !== true);

        // Sorting the languages in alphabetical order
        const sort = filter.sort((a, b) => {
            if (a.title.rendered < b.title.rendered) {
                return -1;
            }
            if (a.title.rendered > b.title.rendered) {
                return 1;
            }
            return 0;
        });

        // Displaying the languages
        const languages = sort.map(language => {
            const { id, slug, title } = language;

            return (
                <button
                    key={id}
                    className="button"
                    style={{ fontSize: '1.5rem' }}
                    value={slug}
                    onClick={e => {
                        setLanguage(e.target.value);
                        this.props.languageSelect();
                    }}
                >
                    {title.rendered}
                </button>
            );
        });

        return (
            <div className="languages">
                <div className="lang-grid">{languages}</div>
            </div>
        );
    }
}

export default OtherLanguages;
