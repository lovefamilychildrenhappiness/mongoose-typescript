import mongoose, { Model, Document } from 'mongoose';

( async () => {
    const conn = await mongoose.createConnection('mongodb://localhost:27017/lawplus_updater', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    interface ILineItem extends Document {
        Name: string;
    }

    interface ILineItemModel extends Model<ILineItem> {
        exportToCsv(category: string, dateRange: string): Promise<void>;
    }
 
    const options = {discriminatorKey: 'kind'};
    const schema = new mongoose.Schema({
        Name: String
    }, options);

    schema.static('exportToCsv', async (category: string, dateRange: string): Promise<void> => {
    });

    // (<ILineItemModel>conn.models.LineItem).exportToCsv
    const LineItem = conn.model<ILineItem, ILineItemModel>('LineItem', schema); // mongoose.model

    var ForeclosureLineItem = LineItem.discriminator('ForeclosureLineItem',
    new mongoose.Schema({caseNo: String}, options));

    await ForeclosureLineItem.create({
        Name: 'eric',
        caseNo: '1234'
    })
    console.log('line items: ', await conn.models.LineItem.count({}));

    // LineItem.exportToCsv
})()
