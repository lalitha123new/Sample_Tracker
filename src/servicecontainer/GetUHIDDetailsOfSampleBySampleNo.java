
package servicecontainer;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for getUHIDDetailsOfSampleBySampleNo complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getUHIDDetailsOfSampleBySampleNo">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="in_token_str" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="in_sample_no" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getUHIDDetailsOfSampleBySampleNo", propOrder = {
    "inTokenStr",
    "inSampleNo"
})
public class GetUHIDDetailsOfSampleBySampleNo {

    @XmlElement(name = "in_token_str")
    protected String inTokenStr;
    @XmlElement(name = "in_sample_no")
    protected String inSampleNo;

    /**
     * Gets the value of the inTokenStr property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInTokenStr() {
        return inTokenStr;
    }

    /**
     * Sets the value of the inTokenStr property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInTokenStr(String value) {
        this.inTokenStr = value;
    }

    /**
     * Gets the value of the inSampleNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInSampleNo() {
        return inSampleNo;
    }

    /**
     * Sets the value of the inSampleNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInSampleNo(String value) {
        this.inSampleNo = value;
    }

}
