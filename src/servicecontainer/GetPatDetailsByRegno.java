
package servicecontainer;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for getPatDetailsByRegno complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getPatDetailsByRegno">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="in_token_str" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="in_reg_no" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="in_hos_id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getPatDetailsByRegno", propOrder = {
    "inTokenStr",
    "inRegNo",
    "inHosId"
})
public class GetPatDetailsByRegno {

    @XmlElement(name = "in_token_str")
    protected String inTokenStr;
    @XmlElement(name = "in_reg_no")
    protected String inRegNo;
    @XmlElement(name = "in_hos_id")
    protected int inHosId;

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
     * Gets the value of the inRegNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInRegNo() {
        return inRegNo;
    }

    /**
     * Sets the value of the inRegNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInRegNo(String value) {
        this.inRegNo = value;
    }

    /**
     * Gets the value of the inHosId property.
     * 
     */
    public int getInHosId() {
        return inHosId;
    }

    /**
     * Sets the value of the inHosId property.
     * 
     */
    public void setInHosId(int value) {
        this.inHosId = value;
    }

}
