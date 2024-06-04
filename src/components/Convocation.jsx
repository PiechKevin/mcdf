import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
    },
    data: {
        marginBottom: 10,
    },
});


const Convocation = ({ data }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Convocation à la Formation</Text>
                    <Text style={styles.label}>Civilité:</Text>
                    <Text style={styles.data}>{data.civilite}</Text>
                    <Text style={styles.label}>Nom:</Text>
                    <Text style={styles.data}>{data.nom}</Text>
                    <Text style={styles.label}>Prénom:</Text>
                    <Text style={styles.data}>{data.prenom}</Text>
                    
                </View>
            </Page>
        </Document>
    );
};

export default Convocation;
