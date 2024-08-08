import React from 'react';

export const PractitionerCard = (props) => {
    const { firstName, lastName, title, location, imgURL, phone } = props;

    return (
        <div
            style={{
                display: 'inline-block',
                width: '38.375rem',
                height: '17.5rem',
                margin: '0.5rem',
                padding: '1.5rem',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 'var(--sds-size-space-200)',
                flexShrink: 0,
                borderRadius: '0.25rem',
                opacity: 'var(--sds-size-stroke-border)',
                background: '#ECECEC',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '2.5rem',
                }}
            >
                <img
                    style={{
                        width: '11.75rem',
                        height: '11.75rem',
                        borderRadius: '0.25rem',
                        opacity: 'var(--sds-size-stroke-border)',
                        objectFit: 'cover',
                    }}
                    src={imgURL}
                />
                <div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '4.625rem',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                alignSelf: 'stretch',
                            }}
                        >
                            <h2
                                style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    fontFamily: '"Fira Sans", sans-serif',
                                    fontSize: '1.5rem',
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    margin: '0px',
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.03rem',
                                    opacity: 'var(--sds-size-stroke-border)',
                                }}
                            >
                                {firstName} {lastName}
                            </h2>
                            <h4
                                style={{
                                    alignSelf: 'stretch',
                                    margin: '0px',
                                    color: '#000',
                                    fontFamily: '"Fira Sans", sans-serif',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.02rem',
                                }}
                            >
                                {title}
                            </h4>
                            <h4
                                style={{
                                    alignSelf: 'stretch',
                                    color: '#000',
                                    fontFamily: '"Fira Sans", sans-serif',
                                    margin: '0px',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.02rem',
                                }}
                            >
                                {location}
                            </h4>
                        </div>
                        <h4
                            style={{
                                alignSelf: 'stretch',
                                color: '#4F72AF',
                                fontFamily: '"Fira Sans", sans-serif',
                                fontSize: '1rem',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                                letterSpacing: '-0.02rem',
                                margin: '0px',
                            }}
                        >
                            {phone}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};
